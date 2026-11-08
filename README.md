# ajc-dev_sandbox

Each experiment in this repo is its own sandbox. Toolchains, dependencies, ports, and containers stay inside that program so one stack does not change another.

Run every command below from the program directory, not the repo root. Host ports are registered in `PORTS.md`.

## Layout

Programs live two levels down: a **group**, then a **technology**, then the program itself.

```
<group>/<technology>/<program>/
```

- Groups are `js/`, `php/`, `db/`, `rust/`, `cpp/`, `java/`, `python/`, `css/`, and `asm/`.
- A technology directory groups programs that share a stack (for example `js/typescript/` or `db/postgres/`).
- Every technology has one reference program named `<technology>-sandbox`. That is the original starter this repo shipped with.
- Add another program by putting a sibling folder next to the `-sandbox`. Each technology directory has a `README.md` that explains how.

Four groups are themselves a single technology, so their programs sit directly under the group with no technology level: `rust/`, `cpp/`, `java/`, and `python/`.

## Structure

```
mise.toml                        Node, pnpm, Rust, Java 21, Python 3.12
PORTS.md                         host port registry
scripts/new-project.ps1          scaffold a new program
scripts/new-project.sh           same scaffold for bash
scripts/templates/               starters used by the scaffold
dashboard/                       local sandbox control panel (port 8787)
js/javascript/javascript-sandbox/      Node, JavaScript only
js/javascript/javascript-repl/         Node REPL
js/typescript/typescript-sandbox/      Node + the TypeScript compiler
js/typescript/typescript-repl/         interactive REPL (readline + vm)
js/next/next-sandbox/                  Next.js, port 3000
js/react/react-sandbox/                Vite + React, port 5173
js/react/react-component-sandbox/      standalone components, port 5176
js/angular/angular-sandbox/            Angular, Node 22, port 4200
js/vue/vue-sandbox/                    Vite + Vue, port 5174
js/nest/nest-sandbox/                  Nest, port 3001
js/graphql/graphql-sandbox/            GraphQL Yoga, port 4000
php/laravel/laravel-sandbox/           PHP 8.4 + MySQL, port 8000
php/wordpress/wordpress-sandbox/       WordPress + MariaDB, port 8080
db/postgres/postgres-sandbox/          PostgreSQL 18, port 5432
db/mysql/mysql-sandbox/                MySQL 8.4, port 3306
db/sqlite/sqlite-sandbox/              SQLite file, no host port
rust/rust-sandbox/                     Cargo crate (reference)
rust/rust-repl/                        an additional Rust program
rust/rust-wasm/                       Rust compiled to WebAssembly
cpp/cpp-sandbox/                       CMake project, optional dev container
cpp/cpp-wasm/                         C++ compiled to WebAssembly
java/java-sandbox/                     plain Java, JDK 21
java/java-repl/                         Java REPL (jshell)
python/python-sandbox/                 plain Python 3.12
python/python-repl/                     Python REPL
css/plain/plain-sandbox/               CSS files, no toolchain
css/tailwind/tailwind-sandbox/         Tailwind 4, port 5175
asm/x86-nasm/x86-nasm-sandbox/         Linux x86-64, NASM
asm/arm64/arm64-sandbox/               Linux AArch64, QEMU
asm/wasm-wat/wasm-wat-sandbox/         WebAssembly text format, wabt
```

`js/`, `php/`, `db/`, `rust/`, `cpp/`, `java/`, `python/`, `css/`, and `asm/` hold technology directories, and the technology directories hold programs. Only programs carry manifests; there is no manifest at the group or technology level.

## Isolation

- Every program has its own manifest (`package.json`, `composer.json`, `Cargo.toml`, or `CMakeLists.txt`) and its own `.gitignore`.
- The repo root has no `package.json`, `pnpm-workspace.yaml`, `tsconfig`, ESLint, Prettier, Tailwind, PostCSS, or Cargo workspace. Tools that search parent directories stop before they find another program.
- Node, pnpm, Rust, Java, and Python come from [mise](https://mise.jdx.dev/). JS programs pin Node again in their own `mise.toml`. `js/angular/angular-sandbox` stays on Node 22. The other JS programs pin Node 24.
- Run package CLIs from the program (`pnpm exec`, `pnpm dlx`). Leave `ng`, `nest`, `next`, and Tailwind uninstalled globally.
- PHP, assembly, PostgreSQL, MySQL, and SQLite run in Docker. Each compose file sets its own project name and network. A database belongs to that compose project only. Laravel and WordPress do not use `db/postgres/postgres-sandbox` or `db/mysql/mysql-sandbox`. `js/graphql/graphql-sandbox` keeps its notes in memory.
- Vite programs set `strictPort`, so a busy port fails instead of moving to the next number.

## Prerequisites

Install [mise](https://mise.jdx.dev/getting-started.html) and Docker Desktop. On Windows, use the WSL2 backend for Docker. From the repo root:

```powershell
mise install
```

That installs Node, pnpm, Rust, Java, and Python on the host. PHP, Composer, NASM, QEMU, PostgreSQL, MySQL, and SQLite stay inside images. The C++ sandbox uses a host CMake and compiler, or the dev container described under `cpp/cpp-sandbox`.

Start Docker Desktop before any `docker compose` command.

## JavaScript and TypeScript

`js/javascript` and `js/typescript` are the language technologies. The other directories under `js/` are framework technologies. Each technology has a `-sandbox` reference program with its own `package.json`; add more programs alongside it (see each technology's `README.md`).

Framework programs install dependencies into their own `node_modules`. From the program directory:

```powershell
pnpm install
```

### js/javascript/javascript-sandbox

Node on the JavaScript sources in this folder. There is no TypeScript compiler, no framework, and no dependency install.

```powershell
pnpm start
```

That runs `src/index.js`.

### js/javascript/javascript-repl

The JavaScript REPL via Node's built-in interactive shell. Run `node` (see `js/javascript/README.md`).

### js/typescript/typescript-sandbox

Node plus the TypeScript compiler, installed in this project. There is no framework.

```powershell
pnpm install
pnpm build
pnpm start
```

`pnpm build` writes JavaScript to `dist`. `pnpm start` runs `dist/index.js`.

### js/typescript/typescript-repl

An interactive REPL built on Node's `readline` and `vm`. It evaluates JavaScript (not TypeScript) and keeps a persistent context; `require` is available inside it. See the [REPL README](js/typescript/typescript-repl/README.md).

```powershell
pnpm install
pnpm build
pnpm start
```

### js/next/next-sandbox

Next.js on port 3000. Node 24.

```powershell
pnpm dev
```

Open `http://localhost:3000`.

```powershell
pnpm build
pnpm start
```

`pnpm build` writes the production output to `.next`. `pnpm start` serves that build on port 3000.

### js/react/react-sandbox

Vite and React on port 5173. Node 24.

```powershell
pnpm dev
```

Open `http://localhost:5173`.

```powershell
pnpm build
pnpm preview
```

`pnpm build` writes static files to `dist`. `pnpm preview` serves that folder on port 5173.

### js/react/react-component-sandbox

A playground for standalone React components on port 5176. Drop a component in `src/components/` and add a section to `src/App.tsx`; the dev server renders each one in isolation. Node 24.

```powershell
pnpm dev
```

Open `http://localhost:5176`.

```powershell
pnpm build
pnpm preview
```

`pnpm build` writes static files to `dist`. `pnpm preview` serves that folder on port 5176.

### js/angular/angular-sandbox

Angular on port 4200. This folder pins Node 22 in `mise.toml`. `@angular/cli` is a dev dependency of this project.

```powershell
pnpm start
```

Open `http://localhost:4200`.

```powershell
pnpm build
```

`pnpm build` writes the production bundle to `dist/angular-app`.

### js/vue/vue-sandbox

Vite and Vue on port 5174. Node 24. React already uses Vite's default port 5173.

```powershell
pnpm dev
```

Open `http://localhost:5174`.

```powershell
pnpm build
pnpm preview
```

`pnpm build` writes static files to `dist`. `pnpm preview` serves that folder on port 5174.

### js/nest/nest-sandbox

Nest on port 3001. Node 24. `@nestjs/cli` is a dev dependency of this project. `GET /` returns `{ "ok": true, "service": "nest-api" }`.

```powershell
pnpm start:dev
```

Open `http://localhost:3001`.

```powershell
pnpm exec nest build
pnpm start
```

`pnpm exec nest build` compiles TypeScript into `dist`. `pnpm start` compiles if needed and runs the API on port 3001.

### js/graphql/graphql-sandbox

GraphQL Yoga on port 4000. Node 24 runs `src/index.ts` directly, so there is no compile step and no build artifact. The schema and the `notes` list live in this process.

```powershell
pnpm dev
```

`pnpm start` is the same command. GraphiQL is at `http://localhost:4000/graphql`.

```graphql
query {
  notes {
    id
    body
  }
}
```

## CSS

### css/plain/plain-sandbox

Stylesheet and page only. Open `css/plain/plain-sandbox/index.html` in a browser. There is nothing to install or build.

### css/tailwind/tailwind-sandbox

Tailwind 4 and Vite on port 5175. Tailwind is installed in this folder. Configuration is `@import "tailwindcss"` in `src/styles.css`. Node 24.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:5175`.

```powershell
pnpm build
```

`pnpm build` writes static files to `dist`.

## PHP

PHP and Composer are inside the images. Build the Laravel image before the first start. WordPress uses published images, so Compose pulls them on start.

### php/laravel/laravel-sandbox

Compose project `sandbox-laravel`, network `sandbox-laravel-net`, host port 8000. MySQL is reachable only as `db` on that network.

```powershell
docker compose up --build
```

Open `http://localhost:8000`. The page prints the PHP version and `mysql ok` when the database is ready.

`public/index.php` is a placeholder so the stack answers before the Laravel skeleton exists. To replace it, from this directory:

```powershell
docker compose run --rm --no-deps app composer create-project laravel/laravel /tmp/laravel --prefer-dist --no-interaction
docker compose run --rm --no-deps app sh -c "cp -a /tmp/laravel/. /var/www/html/"
```

Keep this compose file. After that copy, `docker compose up --build` still starts the app. Laravel's Vite assets, including Tailwind, belong in this project.

### php/wordpress/wordpress-sandbox

Compose project `sandbox-wordpress`, network `sandbox-wordpress-net`, host port 8080. MariaDB stays on that network. WordPress core stays in the `wp-data` volume.

```powershell
docker compose up
```

Open `http://localhost:8080` and finish the installer. There is no local build step. A theme that uses Tailwind needs its own `package.json` and build inside that theme directory.

## Databases

These three servers are independent of Laravel, WordPress, and GraphQL. Compose pulls the PostgreSQL and MySQL images. SQLite is built from this repo.

### db/postgres/postgres-sandbox

PostgreSQL 18. Compose project `sandbox-postgres`, network `sandbox-postgres-net`, host port 5432.

```powershell
docker compose up
```

```text
host=localhost port=5432 dbname=sandbox user=sandbox password=sandbox
```

`init/01-schema.sql` creates the `notes` table the first time the volume is created. Later starts keep that volume. There is no application compile step.

### db/mysql/mysql-sandbox

MySQL 8.4. Compose project `sandbox-mysql`, network `sandbox-mysql-net`, host port 3306. This is separate from the MySQL service inside `php/laravel/laravel-sandbox`.

```powershell
docker compose up
```

```text
mysql://sandbox:sandbox@localhost:3306/sandbox
```

`init/01-schema.sql` creates the `notes` table the first time the volume is created. There is no application compile step.

### db/sqlite/sqlite-sandbox

SQLite in compose project `sandbox-sqlite`, network `sandbox-sqlite-net`. There is no host port. The `sqlite3` binary stays in the image, and `sandbox.db` stays in this directory.

```powershell
docker compose build
docker compose run --rm sqlite sandbox.db ".read schema.sql"
docker compose run --rm sqlite sandbox.db "SELECT * FROM notes;"
```

The second command prints the seeded note. This opens the shell:

```powershell
docker compose run --rm sqlite sandbox.db
```

## Rust

`rust/` is itself the technology, so Rust programs sit directly under it.

### rust/rust-sandbox

`rust-toolchain.toml` pins stable for this folder. There is no `Cargo.toml` above this directory, so Cargo treats the crate as its own package.

```powershell
cargo run
```

That builds and runs the binary. To build without running:

```powershell
cargo build
```

The debug binary is `target/debug/hello` (`target/debug/hello.exe` on Windows).

```powershell
cargo build --release
```

The release binary is `target/release/hello` (`target/release/hello.exe` on Windows).

`rust/rust-repl/` is a second Rust program in this group and shows the pattern for adding another.

### rust/rust-wasm

Rust compiled to WebAssembly (`wasm32-unknown-unknown`). `src/lib.rs` exports an `add` function; `run.mjs` loads the `.wasm` and calls it from Node.

```powershell
cargo build --release --target wasm32-unknown-unknown
node run.mjs
```

The target is pinned in `rust-toolchain.toml`, so rustup installs it on the first build. Output is `add(2, 3) = 5`.

## C++

`cpp/` is itself the technology, so C++ programs sit directly under it.

### cpp/cpp-sandbox

Configure an out-of-tree build, then compile. Objects stay in `build/`.

```powershell
cmake -S . -B build
cmake --build build
```

With Makefiles or Ninja, run `build/hello`. With the Visual Studio generator, run `build/Debug/hello.exe`.

Open this folder in the dev container (`mcr.microsoft.com/devcontainers/cpp:debian-12`) when you want that image's GCC instead of the host compiler. Inside the container, use the same CMake commands, then run `./build/hello`.

### cpp/cpp-wasm

C++ compiled to a standalone WebAssembly module with `clang --target=wasm32` inside Docker. `add.cpp` exports an `add` function; `run.mjs` loads `add.wasm` and calls it from Node.

```powershell
docker compose run --rm app make
node run.mjs
```

Output is `add(2, 3) = 5`.

## Java

`java/` is itself the technology, so Java programs sit directly under it.

### java/java-sandbox

Plain Java with no build tool or framework. The JDK's own `javac` and `java` are the whole toolchain, and Java 21 (Temurin) is pinned in `mise.toml`.

```powershell
javac -d build src/Main.java
java -cp build Main
```

`javac` writes `Main.class` into `build/`. `java` runs it and prints `hello from java`.

### java/java-repl

The Java REPL via `jshell` (included in JDK 21). Run `jshell` (see `java/README.md`).

## Python

`python/` is itself the technology, so Python programs sit directly under it.

### python/python-sandbox

Plain Python with no framework or build step. Python 3.12 is pinned in `mise.toml`.

```powershell
python src/main.py
```

Prints `hello from python`.

### python/python-repl

The Python REPL via the interpreter's interactive mode. Run `python` (see `python/README.md`).

## Assembly

Each target has its own image, compose project, and network. `docker compose run` builds the image on first use, then `make` assembles and runs the program inside the container. The Linux binaries do not run on the Windows host.

### asm/x86-nasm/x86-nasm-sandbox

Target: Linux x86-64. Assembler: NASM, Intel syntax. Compose project `sandbox-asm-x86`, network `sandbox-asm-x86-net`.

```powershell
docker compose run --rm app make
```

`make` writes `hello` in this directory and runs it. Output is `hello from x86-64`.

### asm/arm64/arm64-sandbox

Target: Linux AArch64. Assembler: GNU as, via `aarch64-linux-gnu-gcc`. The image runs the static binary with `qemu-aarch64`. Compose project `sandbox-asm-arm64`, network `sandbox-asm-arm64-net`.

```powershell
docker compose run --rm app make
```

Output is `hello from aarch64`.

### asm/wasm-wat/wasm-wat-sandbox

Target: WebAssembly, text format. Assembler: `wat2wasm` from wabt. Compose project `sandbox-asm-wasm`, network `sandbox-asm-wasm-net`.

```powershell
docker compose run --rm app make
```

`make` writes `hello.wasm` and prints the module with `wasm-objdump`. `hello.wat` exports `add(i32, i32) -> i32`.

## Add a program

To add a new program, target its technology:

```powershell
./scripts/new-project.ps1 js/typescript my-experiment
```

```bash
bash scripts/new-project.sh js/typescript my-experiment
```

The scaffold copies `scripts/templates/<group>` into `<group>/<technology>/<name>`. `rust`, `cpp`, `java`, and `python` take no technology:

```powershell
./scripts/new-project.ps1 rust my-crate
```

Groups: `js`, `php`, `rust`, `cpp`, `java`, `python`, `css`, `asm`. (There is no `db` template; copy a `db/*/*-sandbox` and adapt it.)

For technologies where the group template is not the right starting point, copy the `-sandbox` program instead — for example, copy `js/react/react-sandbox` to add another React program. Every technology directory has a `README.md` with the exact steps.

Work inside the new directory. If it listens on a port, change the template default and add a row to `PORTS.md`. The CSS template defaults to port 5199. The PHP template defaults to port 8090.

## Dashboard

`dashboard/` is a local control panel for this repo. From `dashboard/`:

```powershell
node server.mjs
```

Open `http://127.0.0.1:8787`. It lists every sandbox and starts/stops them with one click — server/docker sandboxes get Start/Stop, one-shot CLIs get Run, interactive REPLs show the terminal command, and static files show the path. Start auto-runs `pnpm install` and any build step as needed. See `dashboard/README.md`.

This repository is licensed under the GNU General Public License v3. See `LICENSE`.
