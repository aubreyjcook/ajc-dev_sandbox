# arm64-sandbox

Target: Linux AArch64.
Assembler: GNU as, via `aarch64-linux-gnu-gcc`.
Calling convention: Linux AArch64 syscalls (`write` is 64, `exit` is 93).
Run: `docker compose run --rm app make`

The container cross-assembles a static binary and runs it with QEMU (`qemu-aarch64`). Nothing in this toolchain is installed on the host. Compose project `sandbox-asm-arm64`, network `sandbox-asm-arm64-net`.
