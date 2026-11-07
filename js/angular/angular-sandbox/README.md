# angular-sandbox

Angular sandbox on port 4200. This folder pins Node 22 in `mise.toml`. The other JS sandboxes pin Node 24. Angular's supported Node range is narrower than Next's, so this project keeps its own pin.

`@angular/cli` is a dev dependency of this project. Run it through pnpm, not a global install.

```powershell
pnpm install
pnpm start
```
