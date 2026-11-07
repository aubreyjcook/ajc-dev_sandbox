# nest-sandbox

Nest sandbox on port 3001. Next already uses 3000, so this API does not. `@nestjs/cli` is a dev dependency. Do not install it globally.

```powershell
pnpm install
pnpm start:dev
```

`GET /` returns `{ "ok": true, "service": "nest-api" }`.
