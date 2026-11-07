# laravel-sandbox

Sail-style PHP and MySQL for Laravel. Compose project `sandbox-laravel`, network `sandbox-laravel-net`, host port 8000. MySQL is only reachable as `db` on that network. PHP and Composer are not installed on the host.

`public/index.php` is a placeholder so the stack answers before the Laravel skeleton exists. It prints the PHP version and `mysql ok` when the database is ready.

```powershell
docker compose up --build
```

To replace the placeholder with Laravel, from this directory:

```powershell
docker compose run --rm --no-deps app composer create-project laravel/laravel /tmp/laravel --prefer-dist --no-interaction
docker compose run --rm --no-deps app sh -c "cp -a /tmp/laravel/. /var/www/html/"
```

Keep this compose file. Laravel's Vite assets, including Tailwind, belong in this project, not in `php/` or the repo root. If you later switch to upstream Sail, keep a unique compose project name so it does not join another app's network or database.
