# sqlite-sandbox

SQLite in compose project `sandbox-sqlite`, network `sandbox-sqlite-net`. There is no host port. The `sqlite3` binary stays in the image, and `sandbox.db` stays in this directory.

```powershell
docker compose run --rm sqlite sandbox.db ".read schema.sql"
docker compose run --rm sqlite sandbox.db "SELECT * FROM notes;"
```

The second command prints the seeded note. Pass more arguments to open the shell:

```powershell
docker compose run --rm sqlite sandbox.db
```

GraphQL and the other database projects do not open this file.
