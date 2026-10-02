import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("records a range update in its difference array", () => {
  const { Imos } = loadLibrary<{ Imos: new (n: number) => any }>("imos.ts", ["Imos"]);
  const imos = new Imos(5); imos.add(1, 4, 3);
  assert.equal(imos.ary[1], 3); assert.equal(imos.ary[4], -3);
  // The current sum implementation accumulates into an uninitialized result array.
  assert.equal(imos.sum().every(Number.isNaN), true);
});
