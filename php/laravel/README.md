# Laravel

PHP 8.4 + MySQL, run entirely in Docker. Composer stays in the image.

## Programs

- [`laravel-sandbox/`](laravel-sandbox/) — the reference app, host port 8000.

## Add a program

Copy `laravel-sandbox/` to a new sibling folder. Give it a unique compose project name and network (top of `docker-compose.yml`), a free `APP_PORT`, and a distinct database volume. Add the port to `PORTS.md`, then `docker compose up --build`.
