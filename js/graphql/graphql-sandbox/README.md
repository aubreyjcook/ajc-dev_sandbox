# graphql-sandbox

GraphQL Yoga on port 4000. Node 24 and pnpm 10 are pinned in `mise.toml`. The schema and the `notes` list live in this process. This server does not open PostgreSQL, MySQL, or SQLite.

```powershell
pnpm install
pnpm dev
```

GraphiQL is at `http://localhost:4000/graphql`.

```graphql
query {
  notes {
    id
    body
  }
}
```
