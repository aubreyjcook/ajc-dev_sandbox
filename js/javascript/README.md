# JavaScript

Plain Node.js. No framework, no TypeScript compiler, no build step.

## Programs

- [`javascript-sandbox/`](javascript-sandbox/) — Node runs `src/index.js` directly.
- [`javascript-repl/`](javascript-repl/) — the Node REPL.

## Add a program

Copy `javascript-sandbox/` to a new sibling folder and change the `name` in `package.json`. Keep the program's own `package.json`, `mise.toml`, and `.gitignore`; there is no manifest at this level or above `js/`.

## Resources

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — the complete guide and reference for the language.
- [ECMAScript specification](https://tc39.es/ecma262/) — the normative language standard.
- [Node.js API documentation](https://nodejs.org/docs/latest/api/) — the runtime's full API reference.
