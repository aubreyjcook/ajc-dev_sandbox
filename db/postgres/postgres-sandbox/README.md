# postgres-sandbox

PostgreSQL 18 in compose project `sandbox-postgres`, network `sandbox-postgres-net`, host port 5432. The data volume belongs to this project. Laravel, WordPress, MySQL, SQLite, and GraphQL do not connect to it.

```powershell
docker compose up
```

```text
host=localhost port=5432 dbname=sandbox user=sandbox password=sandbox
```

`init/01-schema.sql` loads the `notes` table the first time the volume is created. Later starts keep the existing volume.
