# Python

Python is a single-technology group, so programs sit directly under `python/` with no technology level.

## Programs

- [`python-sandbox/`](python-sandbox/) — a plain Python hello script.
- [`python-repl/`](python-repl/) — the Python REPL.

## Add a program

Scaffold one:

```powershell
./scripts/new-project.ps1 python my-program
```

or create a folder with `src/main.py` and your own `mise.toml`. Each program keeps its own `mise.toml` and `.gitignore`; there is no shared config above `python/`.

## Resources

- [Python documentation](https://docs.python.org/3/) — the tutorial, language reference, and library reference.
