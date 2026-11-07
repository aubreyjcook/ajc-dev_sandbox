# react-component-sandbox

A playground for developing React components in isolation. Drop a component in `src/components/`, add a section to `src/App.tsx`, and `pnpm dev` renders each one on its own. No router, no state library, no extra tooling — just Vite + React on port 5176.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:5176`.

```powershell
pnpm build
pnpm preview
```

`pnpm build` writes static files to `dist`. `pnpm preview` serves that folder on port 5176.
