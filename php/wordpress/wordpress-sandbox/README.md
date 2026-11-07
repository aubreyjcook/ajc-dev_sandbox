# wordpress-sandbox

WordPress and MariaDB in compose project `sandbox-wordpress`, network `sandbox-wordpress-net`, host port 8080. The database is not published to the host, and it is not the Laravel database.

WordPress core stays in the `wp-data` volume. PHP is not installed on the host.

```powershell
docker compose up
```

Open `http://localhost:8080` and finish the installer.

A theme that uses Tailwind needs its own `package.json` and build inside that theme directory. Do not put that manifest in `php/` or the repo root.
