# typescript-sandbox

Node sandbox for TypeScript. The compiler is installed in this folder. There is no framework, and this `tsconfig.json` does not extend a parent config. Node 24 is pinned in `mise.toml`.

```powershell
pnpm install
pnpm build
pnpm start
```

`pnpm build` runs `tsc` and writes JavaScript to `dist`. `pnpm start` runs `dist/index.js`.
