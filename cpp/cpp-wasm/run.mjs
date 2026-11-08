import { readFile } from "node:fs/promises";

const wasm = await readFile("add.wasm");
const { instance } = await WebAssembly.instantiate(wasm);
console.log(`add(2, 3) = ${instance.exports.add(2, 3)}`);
