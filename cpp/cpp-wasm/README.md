# cpp-wasm

C++ compiled to a standalone WebAssembly module using `clang --target=wasm32` inside Docker. `add.cpp` exports an `add` function; `run.mjs` loads `add.wasm` and calls it from Node.

```powershell
docker compose run --rm app make
node run.mjs
```

Output:

```text
add(2, 3) = 5
```

`make` runs `clang++ --target=wasm32 -nostdlib … -o add.wasm add.cpp`, producing a bare, import-free module. The toolchain stays in the image.
