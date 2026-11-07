# TypeScript

Node plus the TypeScript compiler. No framework.

## Programs

- [`typescript-sandbox/`](typescript-sandbox/) — the reference starter: `pnpm build` compiles `src/` to `dist/`, `pnpm start` runs `dist/index.js`.
- [`typescript-repl/`](typescript-repl/) — an interactive REPL (`readline` + `vm`).

## Add a program

Either copy `typescript-sandbox/` to a new sibling folder, or scaffold one:

```powershell
./scripts/new-project.ps1 js/typescript my-program
```

Change the `name` in `package.json` and keep `tsconfig.json` self-contained (do not extend anything above the project).
