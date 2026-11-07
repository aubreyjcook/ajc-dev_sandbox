# C++

C++ is a single-technology group, so programs sit directly under `cpp/` with no technology level.

## Programs

- [`cpp-sandbox/`](cpp-sandbox/) — a CMake hello project with an optional dev container.

## Add a program

Scaffold one:

```powershell
./scripts/new-project.ps1 cpp my-program
```

or copy `cpp-sandbox/` to a new sibling folder and change the project/executable name in `CMakeLists.txt`. Configure an out-of-tree build (`cmake -S . -B build`).
