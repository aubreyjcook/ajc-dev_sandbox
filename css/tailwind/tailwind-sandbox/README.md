# tailwind-sandbox

Tailwind 4, pinned in this folder's `package.json` (`tailwindcss` 4.x and `@tailwindcss/vite`). Vite serves it on port 5175. There is no `tailwind.config.js`: v4 is configured with `@import "tailwindcss"` in `src/styles.css`.

Do not hoist this dependency, and do not add a Tailwind or PostCSS config in `css/` or the repo root. A project that still uses Tailwind 3 keeps its own `tailwind.config.js` inside that project.

```powershell
pnpm install
pnpm dev
```
