# WordPress

WordPress + MariaDB via published images.

## Programs

- [`wordpress-sandbox/`](wordpress-sandbox/) — the reference site, host port 8080.

## Add a program

Copy `wordpress-sandbox/` to a new sibling folder. Give it a unique compose project name and network, a free host port, and a distinct `wp-data` volume. Add the port to `PORTS.md`, then `docker compose up`.
