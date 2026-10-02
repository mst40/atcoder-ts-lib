import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

export const libDir = path.resolve(__dirname, "..");

export function loadLibrary<T>(filename: string, names: string[]): T {
  const source = ts.transpile(readFileSync(path.join(libDir, filename), "utf8"), {
    target: ts.ScriptTarget.ES2021,
    module: ts.ModuleKind.None,
  });
  const context = vm.createContext({ console: { log() {}, error() {} } });
  const exposed = names
    .map((name) => `globalThis.__exports[${JSON.stringify(name)}] = ${name};`)
    .join("\n");
  vm.runInContext(`globalThis.__exports = {};\n${source}\n${exposed}`, context, {
    filename,
  });
  return context.__exports as T;
}

export function loadLibraries<T>(filenames: string[], names: string[]): T {
  const source = filenames.map((filename) => ts.transpile(readFileSync(path.join(libDir, filename), "utf8"), {
    target: ts.ScriptTarget.ES2021,
    module: ts.ModuleKind.None,
  })).join("\n");
  const context = vm.createContext({ console: { log() {}, error() {} } });
  const exposed = names.map((name) => `globalThis.__exports[${JSON.stringify(name)}] = ${name};`).join("\n");
  vm.runInContext(`globalThis.__exports = {};\n${source}\n${exposed}`, context, { filename: filenames.join(",") });
  return context.__exports as T;
}

export function libraryFiles(): string[] {
  return readdirSync(libDir).filter((name) => name.endsWith(".ts")).sort();
}

export { assert };
