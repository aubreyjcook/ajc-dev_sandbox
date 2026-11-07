# mysql-sandbox

MySQL 8.4 in compose project `sandbox-mysql`, network `sandbox-mysql-net`, host port 3306. This is not the database inside `php/laravel/laravel-sandbox`. That one stays on `sandbox-laravel-net` and is not published to the host.

```powershell
docker compose up
```

```text
mysql://sandbox:sandbox@localhost:3306/sandbox
```

`init/01-schema.sql` loads the `notes` table the first time the volume is created. Later starts keep the existing volume.
