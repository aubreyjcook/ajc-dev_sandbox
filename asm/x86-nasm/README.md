# x86-64 (NASM)

Linux x86-64, NASM with Intel syntax, run in Docker.

## Programs

- [`x86-nasm-sandbox/`](x86-nasm-sandbox/) — `make` assembles and runs a hello program.

## Add a program

Copy `x86-nasm-sandbox/` to a new sibling folder. Give it a unique compose project name and network, and adapt the `Makefile`/`Dockerfile` if your target differs.

## Resources

- [NASM manual](https://www.nasm.us/doc/) — the assembler reference.
- [Intel 64 and IA-32 Software Developer Manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) — the instruction set reference.
