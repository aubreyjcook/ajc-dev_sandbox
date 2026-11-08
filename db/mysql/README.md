# MySQL

MySQL 8.4 in Docker.

## Programs

- [`mysql-sandbox/`](mysql-sandbox/) — host port 3306, `mysql://sandbox:sandbox@localhost:3306/sandbox`.

## REPL

The `mysql` shell runs inside the container (start it first with `docker compose up -d`):

```powershell
docker compose exec db mysql -u sandbox -psandbox sandbox
```

## Add a program

Copy `mysql-sandbox/` to a new sibling folder. Give it a unique compose project name and network, a free host port, and a distinct volume. Seed your schema in `init/`. Add the port to `PORTS.md`.

## Resources

- [MySQL reference manual](https://dev.mysql.com/doc/) — the official documentation.
