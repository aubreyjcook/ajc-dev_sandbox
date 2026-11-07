# __NAME__

Target: Linux x86-64.
Assembler: NASM, Intel syntax.
Calling convention: System V syscalls (`write`, `exit`).
Run: `docker compose run --rm app make`

The binary is linked for Linux inside the container. It does not run on the Windows host. Compose project name is `sandbox-__NAME__`, network `sandbox-__NAME__-net`.

For AArch64 or WebAssembly, start from `asm/arm64/arm64-sandbox` or `asm/wasm-wat/wasm-wat-sandbox` instead of this template.
