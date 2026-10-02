import test from "node:test";
import { readdirSync } from "node:fs";
import path from "node:path";
import { libraryFiles, assert } from "./helpers";

test("a dedicated test file exists for every TypeScript library file", () => {
  const tested = readdirSync(path.join(__dirname, "algorithms"))
    .concat(readdirSync(path.join(__dirname, "data-structures")))
    .filter((name) => name.endsWith(".test.ts"))
    .map((name) => name.replace(/\.test\.ts$/, ".ts"))
    .sort();
  assert.deepEqual(libraryFiles(), tested);
});

test("a dedicated documentation page exists for every TypeScript library file", () => {
  const documented = readdirSync(path.join(__dirname, "..", "docs", "algorithms"))
    .concat(readdirSync(path.join(__dirname, "..", "docs", "data-structures")))
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ".ts"))
    .sort();
  assert.deepEqual(libraryFiles(), documented);
});
