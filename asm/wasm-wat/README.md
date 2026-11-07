# WebAssembly (WAT)

WebAssembly text format, assembled with `wat2wasm` from wabt in Docker.

## Programs

- [`wasm-wat-sandbox/`](wasm-wat-sandbox/) — `make` produces `hello.wasm` and prints the module.

## Add a program

Copy `wasm-wat-sandbox/` to a new sibling folder. Give it a unique compose project name and network, and adapt the `Makefile`/`Dockerfile` if your target differs.
