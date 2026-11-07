# Tailwind

Tailwind CSS 4 with Vite on Node 24. Configuration is `@import "tailwindcss"` in `src/styles.css`.

## Programs

- [`tailwind-sandbox/`](tailwind-sandbox/) — the reference playground, port 5175.

## Add a program

Copy `tailwind-sandbox/` to a new sibling folder, or scaffold one:

```powershell
./scripts/new-project.ps1 css/tailwind my-program
```

Change the `name` in `package.json`, set a free port in `vite.config.ts`, and add it to `PORTS.md`. Then `pnpm install` and `pnpm dev`.
