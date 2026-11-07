# react-component-sandbox

A playground for developing React components in isolation. Drop a component in `src/components/`, add a section to `src/App.tsx`, and `pnpm dev` renders each one on its own. Vite + React on port 5176.

Included components:

- `WorldMap` — an SVG world map that can highlight any number of countries at once (built on `d3-geo` + `world-atlas`).
- `Button`, `Badge` — simple examples of the isolation pattern.

## WorldMap

```tsx
<WorldMap
  highlighted={["Brazil", "France", "Australia", "Japan", "Egypt"]}
/>
```

`highlighted` takes an array of country names (world-atlas full names such as `"United States of America"`), so you can highlight multiple countries at the same time. Omit it (or pass `[]`) for a plain map. Colors are customizable via `highlightColor`, `baseColor`, and `strokeColor`.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:5176`.

```powershell
pnpm build
pnpm preview
```

`pnpm build` writes static files to `dist`. `pnpm preview` serves that folder on port 5176.
