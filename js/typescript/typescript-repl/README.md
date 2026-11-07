# typescript-repl

An interactive REPL written in TypeScript. It reads a line at a time with Node's `readline`, evaluates it with `vm`, and keeps a persistent context so variables survive between lines.

This is a TypeScript project, but the code you type is JavaScript — Node's `vm` runs plain JS, so type-only syntax such as `let x: number = 5` is not accepted. `require` is available inside the REPL, anchored to this folder's `node_modules`.

```powershell
pnpm install
pnpm build
pnpm start
```

`pnpm build` runs `tsc` and writes JavaScript to `dist`. `pnpm start` runs `dist/index.js`.

Commands:

- `.help` — show help
- `.exit` / `.quit` — quit
- `.clear` / `.reset` — clear the execution context
- Ctrl+C — interrupt the current input
- Ctrl+D — exit
