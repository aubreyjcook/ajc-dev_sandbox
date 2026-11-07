const groupsEl = document.getElementById("groups");
const summaryEl = document.getElementById("summary");
const filterEl = document.getElementById("filter");

let data = null;
let lastKey = "";
const expanded = new Set();

async function api(path, opts) {
  const res = await fetch(path, opts);
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function controlHtml(s) {
  const st = s.status;
  if (s.type === "server" || s.type === "docker") {
    const active = st === "running" || st === "starting";
    return active
      ? `<button data-action="stop" data-id="${s.id}">Stop</button>`
      : `<button data-action="start" data-id="${s.id}">Start</button>`;
  }
  if (s.type === "run") {
    const busy = ["installing", "building", "starting", "running", "pending"].includes(st);
    let html = `<button data-action="start" data-id="${s.id}" ${busy ? "disabled" : ""}>Run</button>`;
    if (st === "running") html += ` <button data-action="stop" data-id="${s.id}">Stop</button>`;
    return html;
  }
  if (s.type === "interactive") {
    return `<button data-action="start" data-id="${s.id}">Prepare</button>`;
  }
  return "";
}

function cardHtml(s) {
  const port = s.port
    ? `<span class="port"><a href="http://localhost:${s.port}" target="_blank" rel="noreferrer">:${s.port} ↗</a></span>`
    : "";
  const code = s.status === "exited" && s.code != null ? ` (exit ${s.code})` : "";
  const meta =
    s.type === "interactive"
      ? `<div class="meta">run in a terminal: <code class="cmd">cd ${s.path} && ${s.command}</code></div>`
      : s.type === "static"
        ? `<div class="meta">open in a browser: <code class="cmd">${s.openPath}</code></div>`
        : "";

  return `
    <div class="card" data-id="${s.id}">
      <div class="row">
        <span class="name">${s.name}</span>
        <span class="type type-${s.type}">${s.type}</span>
        ${port}
        <span class="desc">${s.description}</span>
        <span class="status status-${s.status}">${s.status}${code}</span>
        <span class="controls">
          ${controlHtml(s)}
          <button class="log-toggle ${expanded.has(s.id) ? "active" : ""}" data-action="toggle" data-id="${s.id}">logs</button>
        </span>
      </div>
      ${meta}
      <pre class="logs ${expanded.has(s.id) ? "open" : ""}" data-logs="${s.id}"></pre>
    </div>`;
}

function render() {
  if (!data) return;
  const q = filterEl.value.trim().toLowerCase();
  const grouped = {};
  for (const g of data.groups) grouped[g] = [];
  for (const s of data.sandboxes) {
    if (grouped[s.group]) grouped[s.group].push(s);
  }

  let running = 0;
  let html = "";
  for (const g of data.groups) {
    const list = grouped[g].filter(
      (s) =>
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
    if (!list.length) continue;
    html += `<section><h2>${g}</h2>${list.map(cardHtml).join("")}</section>`;
    for (const s of list) if (s.status === "running") running++;
  }
  groupsEl.innerHTML = html;
  summaryEl.textContent = `${running} running / ${data.sandboxes.length} total`;
}

async function refresh() {
  const res = await api("/api/sandboxes");
  if (!res) return;
  const key = JSON.stringify(res.sandboxes.map((s) => `${s.status}:${s.code}`));
  data = res;
  if (key !== lastKey) {
    lastKey = key;
    render();
  }
}

async function refreshLogs() {
  for (const id of expanded) {
    const res = await api(`/api/sandboxes/${id}/logs`);
    const pre = document.querySelector(`[data-logs="${id}"]`);
    if (pre && res) {
      pre.textContent = res.logs
        .map((l) => `[${l.time.slice(11, 19)}] ${l.text}`)
        .join("\n");
      pre.scrollTop = pre.scrollHeight;
    }
  }
}

async function act(id, action) {
  const res = await api(`/api/sandboxes/${id}/${action}`, { method: "POST" });
  if (res && res.ok) {
    if (action === "start") expanded.add(id);
    await refresh();
    await refreshLogs();
  } else if (res && res.error) {
    // eslint-disable-next-line no-alert
    alert(res.error);
  }
}

groupsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  const { id, action } = btn.dataset;
  if (action === "toggle") {
    if (expanded.has(id)) expanded.delete(id);
    else expanded.add(id);
    render();
    refreshLogs();
    return;
  }
  act(id, action);
});

filterEl.addEventListener("input", render);

refresh();
setInterval(refresh, 2000);
setInterval(refreshLogs, 1000);
