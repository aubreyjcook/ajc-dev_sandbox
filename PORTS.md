# Ports

Host ports are assigned per program so more than one sandbox can run at the same time. If you add a server, pick a free port and add a row here.

Laravel and WordPress keep their databases on a private compose network. `db/postgres/postgres-sandbox` and `db/mysql/mysql-sandbox` publish their own host ports. No program shares a database volume or network with another.

| Project | Service | Host port |
| --- | --- | --- |
| `js/javascript/javascript-sandbox` | Node | none |
| `js/typescript/typescript-sandbox` | Node | none |
| `js/typescript/typescript-repl` | CLI | none |
| `js/next/next-sandbox` | Next.js | 3000 |
| `js/nest/nest-sandbox` | Nest | 3001 |
| `js/graphql/graphql-sandbox` | GraphQL | 4000 |
| `db/postgres/postgres-sandbox` | PostgreSQL | 5432 |
| `db/mysql/mysql-sandbox` | MySQL | 3306 |
| `db/sqlite/sqlite-sandbox` | SQLite file | none |
| `js/angular/angular-sandbox` | Angular | 4200 |
| `js/react/react-sandbox` | Vite | 5173 |
| `js/react/react-component-sandbox` | Vite | 5176 |
| `js/vue/vue-sandbox` | Vite | 5174 |
| `css/tailwind/tailwind-sandbox` | Vite | 5175 |
| `php/laravel/laravel-sandbox` | PHP | 8000 |
| `php/wordpress/wordpress-sandbox` | Apache | 8080 |
| `css/plain/plain-sandbox` | static files | none |
| `rust/rust-sandbox` | CLI | none |
| `rust/rust-repl` | CLI | none |
| `cpp/cpp-sandbox` | CLI | none |
| `java/java-sandbox` | CLI | none |
| `python/python-sandbox` | CLI | none |
| `asm/x86-nasm/x86-nasm-sandbox` | CLI in Docker | none |
| `asm/arm64/arm64-sandbox` | CLI in Docker | none |
| `asm/wasm-wat/wasm-wat-sandbox` | CLI in Docker | none |

The scaffold template for a new CSS program defaults to port 5199, and the PHP template defaults to port 8090, so a new program does not take a port already listed above. Change that default before you rely on it, and record the final port in this file.
