# rust-wasm

Rust compiled to WebAssembly (`wasm32-unknown-unknown`). `src/lib.rs` exports an `add` function; `run.mjs` loads the compiled `.wasm` and calls it from Node.

```powershell
cargo build --release --target wasm32-unknown-unknown
node run.mjs
```

The `wasm32-unknown-unknown` target is pinned in `rust-toolchain.toml`, so rustup installs it automatically on the first build. (You can also run `rustup target add wasm32-unknown-unknown` manually.)

Output:

```text
add(2, 3) = 5
```

The artifact is `target/wasm32-unknown-unknown/release/rust_wasm.wasm`.
