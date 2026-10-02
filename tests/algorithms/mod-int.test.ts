import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("provides number-based modular arithmetic operations", () => {
  const { ModInt } = loadLibrary<{ ModInt: new (m: number) => any }>("mod-int.ts", ["ModInt"]);
  const mod = new ModInt(101);
  assert.equal(mod.pow(3, 4), 81); assert.equal(mod.div(6, 2), 3);
  assert.equal(mod.fac(5), 19); assert.equal(mod.nPr(5, 3), 60);
});
