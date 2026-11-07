# cpp-sandbox

C++ sandbox. Builds go in `build/`, not next to the sources.

```powershell
cmake -S . -B build
cmake --build build
```

The binary is `build/hello` with Makefiles or Ninja, and `build/Debug/hello.exe` with the Visual Studio generator.

Open this folder in the dev container for a fixed GCC toolchain (`mcr.microsoft.com/devcontainers/cpp:debian-12`) when you do not want the host compiler.
