# React

Vite + React on Node 24.

## Programs

- [`react-sandbox/`](react-sandbox/) — the reference app, port 5173.
- [`react-component-sandbox/`](react-component-sandbox/) — a playground for standalone components, port 5176.

## Add a program

Copy `react-sandbox/` to a new sibling folder, change the `name` in `package.json`, and set a free port in `vite.config.ts` (Vite uses `strictPort`). Add the port to `PORTS.md`, then `pnpm install` and `pnpm dev`.
