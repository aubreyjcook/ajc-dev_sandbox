# Rust

Rust is a single-technology group, so programs sit directly under `rust/` with no technology level.

## Programs

- [`rust-sandbox/`](rust-sandbox/) — a hello crate.
- [`rust-repl/`](rust-repl/) — a small arithmetic REPL.
- [`rust-wasm/`](rust-wasm/) — Rust compiled to WebAssembly.

## Add a program

Scaffold one:

```powershell
./scripts/new-project.ps1 rust my-crate
```

or run `cargo new my-crate` inside `rust/`. Keep each crate's own `Cargo.toml` and `rust-toolchain.toml`; there is no Cargo workspace above `rust/`.

## Resources

- [The Rust Programming Language](https://doc.rust-lang.org/book/) — the canonical book.
- [The Rust Reference](https://doc.rust-lang.org/reference/) — the language reference.
- [Rust standard library](https://doc.rust-lang.org/std/) — the std API docs.
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/) — for `rust-wasm`.
