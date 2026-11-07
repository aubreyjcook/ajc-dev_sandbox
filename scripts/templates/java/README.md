# __NAME__

Plain Java. The JDK's own `javac` and `java` are the whole toolchain. Java 21 (Temurin) is pinned in `mise.toml`.

```powershell
javac -d build src/Main.java
java -cp build Main
```
