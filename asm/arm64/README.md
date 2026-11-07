# AArch64

Linux AArch64, assembled with `aarch64-linux-gnu-gcc` and run under QEMU in Docker.

## Programs

- [`arm64-sandbox/`](arm64-sandbox/) — `make` assembles and runs a hello program.

## Add a program

Copy `arm64-sandbox/` to a new sibling folder. Give it a unique compose project name and network, and adapt the `Makefile`/`Dockerfile` if your target differs.
