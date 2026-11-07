# JavaScript and TypeScript

Build and run reference for every technology under `js/`. Run each command from that program's directory (for example `js/next/next-sandbox`), never from `js/` or the repo root.

Any program with dependencies needs `pnpm install` first, also from its own directory. Every program pins Node 24 in its own `mise.toml`, except Angular, which pins Node 22.

## javascript

Plain Node — no build step, no dependencies.

| Program | Run |
| --- | --- |
| `javascript-sandbox` | `pnpm start` (runs `src/index.js`) |

## typescript

Node plus the TypeScript compiler.

| Program | Build | Run |
| --- | --- | --- |
| `typescript-sandbox` | `pnpm build` (tsc → `dist`) | `pnpm start` (runs `dist/index.js`) |
| `typescript-repl` | `pnpm build` (tsc → `dist`) | `pnpm start` (runs `dist/index.js`) |

## next

Next.js, port 3000.

| Task | Command |
| --- | --- |
| Dev server | `pnpm dev` |
| Production build | `pnpm build` (→ `.next`) |
| Serve build | `pnpm start` |

## react

Vite + React, port 5173.

| Task | Command |
| --- | --- |
| Dev server | `pnpm dev` |
| Production build | `pnpm build` (→ `dist`) |
| Preview build | `pnpm preview` |

## angular

Angular, Node 22, port 4200.

| Task | Command |
| --- | --- |
| Dev server | `pnpm start` |
| Production build | `pnpm build` (→ `dist/angular-app`) |

## vue

Vite + Vue, port 5174.

| Task | Command |
| --- | --- |
| Dev server | `pnpm dev` |
| Production build | `pnpm build` (→ `dist`) |
| Preview build | `pnpm preview` |

## nest

Nest, port 3001.

| Task | Command |
| --- | --- |
| Dev server | `pnpm start:dev` |
| Compile | `pnpm exec nest build` (→ `dist`) |
| Run | `pnpm start` (compiles if needed) |

## graphql

GraphQL Yoga, port 4000. No compile step.

| Task | Command |
| --- | --- |
| Dev server | `pnpm dev` (same as `pnpm start`) |

Host ports are registered in `PORTS.md`. To add another program, follow the technology's own `README.md` (for example `js/typescript/README.md`) or run `./scripts/new-project.ps1 js/<tech> <name>`.
