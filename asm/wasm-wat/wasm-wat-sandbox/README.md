# wasm-wat-sandbox

Target: WebAssembly (wasm32), text format.
Assembler: `wat2wasm` from wabt.
Run: `docker compose run --rm app make`

`hello.wat` exports `add(i32, i32) -> i32`. The Makefile assembles it and prints the module with `wasm-objdump`. wabt stays in the image. Compose project `sandbox-asm-wasm`, network `sandbox-asm-wasm-net`.
