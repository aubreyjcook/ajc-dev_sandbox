import http from "node:http";
import { spawn, spawnSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sandboxes, groups } from "./sandboxes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(__dirname, "public");

const HOST = process.env.DASHBOARD_HOST || "127.0.0.1";
const PORT = Number(process.env.DASHBOARD_PORT || 8787);
const MAX_LOG = 500;

const byId = new Map(sandboxes.map((s) => [s.id, s]));

// Per-sandbox runtime state.
const state = new Map(
  sandboxes.map((s) => [s.id, { status: "stopped", code: null, child: null, stopRequested: false }]),
);

// Per-sandbox log ring buffer: [{ time, stream, text }].
const logs = new Map(sandboxes.map((s) => [s.id, []]));

function appendLog(id, stream, text) {
  const buf = logs.get(id) || [];
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.replace(/\r$/, "");
    if (line === "") continue;
    buf.push({ time: new Date().toISOString(), stream, text: line });
    if (buf.length > MAX_LOG) buf.shift();
  }
  logs.set(id, buf);
}

function setStatus(id, status, code = null) {
  const st = state.get(id);
  st.status = status;
  if (code !== null) st.code = code;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function spawnLogged(id, cmd, args, cwd) {
  const child = spawn(cmd, args, {
    cwd,
    // npm-style CLIs (pnpm, ng, nest) are .cmd shims on Windows, so they need a
    // shell to resolve. Real executables (docker, cmake, cargo, java, python)
    // also work fine through cmd.exe.
    shell: process.platform === "win32",
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  state.get(id).child = child;
  child.stdout.on("data", (d) => appendLog(id, "stdout", d.toString()));
  child.stderr.on("data", (d) => appendLog(id, "stderr", d.toString()));
  child.on("error", (err) => {
    appendLog(id, "system", `failed to run ${cmd}: ${err.message}`);
  });
  child.on("close", (code) => {
    if (state.get(id).child === child) state.get(id).child = null;
  });
  return child;
}

async function spawnAndWait(id, cmd, args, cwd) {
  const child = spawnLogged(id, cmd, args, cwd);
  return await new Promise((resolve) => {
    child.on("close", (code) => resolve({ code }));
  });
}

function killTree(child) {
  if (!child) return;
  if (process.platform === "win32") {
    try {
      spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } catch {
      /* ignore */
    }
  } else {
    try {
      child.kill("SIGTERM");
    } catch {
      /* ignore */
    }
  }
}

function resolveRunCmd(entry) {
  if (entry.run.binaries) {
    for (const rel of entry.run.binaries) {
      const p = path.join(root, entry.path, rel);
      if (existsSync(p)) return { cmd: p, args: [] };
    }
    throw new Error("build output not found — run the build first");
  }
  return { cmd: entry.run.cmd, args: entry.run.args };
}

// Run install and/or build if their markers are missing.
async function prepare(id, entry) {
  const base = path.join(root, entry.path);

  if (entry.install && !existsSync(path.join(base, entry.install.marker))) {
    setStatus(id, "installing");
    appendLog(id, "system", `$ ${entry.install.cmd} ${entry.install.args.join(" ")}`);
    const r = await spawnAndWait(id, entry.install.cmd, entry.install.args, base);
    if (r.code !== 0) throw new Error(`install failed (exit ${r.code})`);
  }

  if (entry.build && !existsSync(path.join(base, entry.buildMarker))) {
    setStatus(id, "building");
    for (const step of entry.build) {
      appendLog(id, "system", `$ ${step.cmd} ${step.args.join(" ")}`);
      const r = await spawnAndWait(id, step.cmd, step.args, base);
      if (r.code !== 0) throw new Error(`build failed (exit ${r.code})`);
    }
  }
}

async function runStartFlow(id) {
  const entry = byId.get(id);
  state.get(id).stopRequested = false;
  try {
    if (entry.type === "docker") {
      setStatus(id, "starting");
      appendLog(id, "system", `$ ${entry.up.cmd} ${entry.up.args.join(" ")}`);
      const r = await spawnAndWait(id, entry.up.cmd, entry.up.args, path.join(root, entry.path));
      setStatus(id, r.code === 0 ? "running" : "error", r.code);
      return;
    }

    if (entry.type === "static") {
      setStatus(id, "stopped");
      return;
    }

    if (entry.type === "interactive") {
      await prepare(id, entry);
      setStatus(id, "ready");
      return;
    }

    // server / run
    await prepare(id, entry);

    setStatus(id, "starting");
    const run = resolveRunCmd(entry);
    appendLog(id, "system", `$ ${run.cmd} ${run.args.join(" ")}`);

    if (entry.type === "run") {
      const r = await spawnAndWait(id, run.cmd, run.args, path.join(root, entry.path));
      if (state.get(id).stopRequested) {
        setStatus(id, "stopped");
        state.get(id).stopRequested = false;
      } else {
        setStatus(id, "exited", r.code);
      }
    } else {
      const child = spawnLogged(id, run.cmd, run.args, path.join(root, entry.path));
      child.on("close", (code) => {
        if (state.get(id).stopRequested) {
          setStatus(id, "stopped");
          state.get(id).stopRequested = false;
        } else {
          setStatus(id, code === 0 ? "stopped" : "error", code);
        }
      });
      // Give it a moment to crash on its own (port in use, missing binary, etc.).
      await sleep(700);
      if (state.get(id).status === "starting") setStatus(id, "running");
    }
  } catch (err) {
    if (state.get(id).stopRequested) {
      setStatus(id, "stopped");
      state.get(id).stopRequested = false;
    } else {
      appendLog(id, "system", `error: ${err && err.message ? err.message : err}`);
      setStatus(id, "error");
    }
  }
}

async function runStopFlow(id) {
  const entry = byId.get(id);
  const st = state.get(id);

  if (entry.type === "docker") {
    if (st.status !== "running") return { ok: false, error: "not running" };
    setStatus(id, "stopping");
    appendLog(id, "system", `$ ${entry.down.cmd} ${entry.down.args.join(" ")}`);
    const r = await spawnAndWait(id, entry.down.cmd, entry.down.args, path.join(root, entry.path));
    setStatus(id, r.code === 0 ? "stopped" : "error", r.code);
    return { ok: r.code === 0 };
  }

  if (st.child) {
    st.stopRequested = true;
    appendLog(id, "system", "stopping…");
    killTree(st.child);
  }
  setStatus(id, "stopped");
  return { ok: true };
}

function publicSandbox(entry) {
  const st = state.get(entry.id);
  return {
    id: entry.id,
    name: entry.name,
    group: entry.group,
    type: entry.type,
    port: entry.port,
    path: entry.path,
    description: entry.description,
    status: st.status,
    code: st.code,
    command: entry.command || null,
    openPath: entry.openPath || null,
  };
}

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.resolve(PUBLIC_DIR, "." + pathname);
  if (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== PUBLIC_DIR) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("not a file");
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;

  try {
    if (p === "/api/sandboxes" && req.method === "GET") {
      sendJson(res, 200, { groups, sandboxes: sandboxes.map(publicSandbox) });
      return;
    }

    if (p === "/api/sandboxes" && req.method === "POST") {
      // Reserved for future bulk actions.
      sendJson(res, 501, { ok: false, error: "use /api/sandboxes/:id" });
      return;
    }

    const m = p.match(/^\/api\/sandboxes\/([^/]+)\/(start|stop|logs)$/);
    if (m) {
      const [, id, action] = m;
      const entry = byId.get(id);
      if (!entry) {
        sendJson(res, 404, { ok: false, error: "unknown sandbox" });
        return;
      }

      if (action === "logs" && req.method === "GET") {
        sendJson(res, 200, { id, logs: logs.get(id) || [] });
        return;
      }

      if (action === "start" && req.method === "POST") {
        const st = state.get(id);
        if (["running", "installing", "building", "starting"].includes(st.status)) {
          sendJson(res, 409, { ok: false, error: `already ${st.status}` });
          return;
        }
        setStatus(id, "pending");
        runStartFlow(id);
        sendJson(res, 202, { ok: true, id, status: state.get(id).status });
        return;
      }

      if (action === "stop" && req.method === "POST") {
        const result = await runStopFlow(id);
        sendJson(res, result.ok ? 200 : 409, result);
        return;
      }
    }

    if (req.method === "GET") {
      await serveStatic(req, res);
      return;
    }

    sendJson(res, 404, { ok: false, error: "not found" });
  } catch (err) {
    sendJson(res, 500, { ok: false, error: String((err && err.message) || err) });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Sandbox dashboard: http://${HOST}:${PORT}`);
  console.log(`Controlling ${sandboxes.length} sandboxes.`);
});
