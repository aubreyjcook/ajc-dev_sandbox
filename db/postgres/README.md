# PostgreSQL

PostgreSQL 18 in Docker.

## Programs

- [`postgres-sandbox/`](postgres-sandbox/) — host port 5432, db/user/password all `sandbox`.

## Add a program

Copy `postgres-sandbox/` to a new sibling folder. Give it a unique compose project name and network, a free host port, and a distinct volume. Seed your schema in `init/`. Add the port to `PORTS.md`.

## Resources

- [PostgreSQL documentation](https://www.postgresql.org/docs/) — the official manuals.
