# x86-nasm-sandbox

Target: Linux x86-64.
Assembler: NASM, Intel syntax.
Calling convention: System V. The program uses the `write` and `exit` syscalls.
Run: `docker compose run --rm app make`

NASM, binutils, and the binary stay in the `sandbox-asm-x86` compose project (network `sandbox-asm-x86-net`). The binary is a Linux ELF file, so it does not run on the Windows host.
