# Java

Java is a single-technology group, so programs sit directly under `java/` with no technology level.

## Programs

- [`java-sandbox/`](java-sandbox/) — a plain Java hello program (`javac` + `java`).
- [`java-repl/`](java-repl/) — the Java REPL (`jshell`).

## Add a program

Scaffold one:

```powershell
./scripts/new-project.ps1 java my-program
```

or create a folder with `src/Main.java` and your own `mise.toml`. Each program keeps its own `mise.toml` and `.gitignore`; there is no shared build config above `java/`.

## Resources

- [Java documentation (JDK 21)](https://docs.oracle.com/en/java/javase/21/) — the official guides and API.
- [The Java Language Specification](https://docs.oracle.com/javase/specs/jls/se21/html/) — the normative spec.
