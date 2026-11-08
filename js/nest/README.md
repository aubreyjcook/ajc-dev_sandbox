# Nest

NestJS on Node 24. `@nestjs/cli` is a dev dependency of each program.

## Programs

- [`nest-sandbox/`](nest-sandbox/) — the reference API, port 3001. `GET /` returns `{ "ok": true, "service": "nest-api" }`.

## REPL

Nest has an official REPL for inspecting the dependency-injection graph interactively:

```powershell
pnpm exec nest start --entryFile repl
```

See the [NestJS REPL documentation](https://docs.nestjs.com/recipes/repl).

## Add a program

Copy `nest-sandbox/` to a new sibling folder, change the `name` in `package.json`, and set a free port in `src/main.ts`. Add the port to `PORTS.md`, then `pnpm install` and `pnpm start:dev`.

## Resources

- [NestJS documentation](https://docs.nestjs.com/) — the official, exhaustive guide.
