# JavaScript

Plain Node.js. No framework, no TypeScript compiler, no build step.

## Programs

- [`javascript-sandbox/`](javascript-sandbox/) — Node runs `src/index.js` directly.

## Add a program

Copy `javascript-sandbox/` to a new sibling folder and change the `name` in `package.json`. Keep the program's own `package.json`, `mise.toml`, and `.gitignore`; there is no manifest at this level or above `js/`.
