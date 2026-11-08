# GraphQL

GraphQL Yoga on Node 24. `src/index.ts` runs directly, so there is no compile step.

## Programs

- [`graphql-sandbox/`](graphql-sandbox/) — the reference API, port 4000. GraphiQL at `/graphql`.

## Add a program

Copy `graphql-sandbox/` to a new sibling folder, change the `name` in `package.json`, and set a free port in `src/index.ts`. Add the port to `PORTS.md`, then `pnpm install` and `pnpm dev`.

## Resources

- [GraphQL](https://graphql.org/learn/) — the language guide and tutorials.
- [GraphQL specification](https://spec.graphql.org/) — the normative spec.
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/docs) — the server used here.
