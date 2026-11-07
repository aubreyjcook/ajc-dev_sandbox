# Sandbox Dashboard

A local control panel that lists every sandbox in this repo and starts/stops them with one click. It binds to `127.0.0.1` only.

## Run

```powershell
node server.mjs
```

Then open `http://127.0.0.1:8787`.

There is no install step — the dashboard uses only Node built-ins (Node 24 from mise).

## What it does

- Lists every sandbox, grouped by `js`, `css`, `php`, `db`, `rust`, `cpp`, `java`, `python`, and `asm`.
- **server** / **docker** sandboxes get **Start / Stop**. Docker ones use `docker compose up -d` / `docker compose down`.
- **run** sandboxes (one-shot CLIs) get a **Run** button that captures output and reports the exit code.
- **interactive** sandboxes (the REPLs and the SQLite shell) show the exact terminal command — they need a TTY, so the dashboard does not run them headlessly.
- **static** (`css/plain`) shows the file to open.
- Start/Run automatically runs `pnpm install` and any build step when they are missing — one click from a fresh clone.
- Live per-sandbox logs stream in the UI.

## Configuration

`sandboxes.mjs` is the single source of truth. Add or edit a sandbox there; the dashboard picks it up on the next start.

The port is 8787 by default. Override with `DASHBOARD_PORT` (and `DASHBOARD_HOST`, though it stays on localhost).

## Notes

- Stopping on Windows kills the whole process tree (`taskkill /T /F`), so child servers (Vite, esbuild, etc.) are not orphaned.
- Requires mise (Node/Rust/Java/Python), Docker Desktop, and any host toolchain a sandbox needs.
- The dashboard itself never stages or commits git changes.
