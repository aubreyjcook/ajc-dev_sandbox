# WebAssembly (WAT)

WebAssembly text format, assembled with `wat2wasm` from wabt in Docker.

## Programs

- [`wasm-wat-sandbox/`](wasm-wat-sandbox/) — `make` produces `hello.wasm` and prints the module.

## Add a program

Copy `wasm-wat-sandbox/` to a new sibling folder. Give it a unique compose project name and network, and adapt the `Makefile`/`Dockerfile` if your target differs.

## Resources

- [WebAssembly](https://webassembly.org/) — the format and ecosystem.
- [WebAssembly specification](https://webassembly.github.io/spec/) — the normative spec (core and text format).
- [MDN WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly) — guide and reference.
- [wabt](https://github.com/WebAssembly/wabt) — the `wat2wasm` tools.
