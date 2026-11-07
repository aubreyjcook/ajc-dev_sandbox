# java-sandbox

Plain Java. There is no build tool or framework — the JDK's own `javac` and `java` are the whole toolchain. Java 21 (Temurin) is pinned in `mise.toml`.

```powershell
javac -d build src/Main.java
java -cp build Main
```

The first command compiles `src/Main.java` into `build/`. The second runs it and prints `hello from java`.
