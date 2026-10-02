import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("provides bigint modular arithmetic and default modulus operations", () => {
  const { Mod, mod } = loadLibrary<{ Mod: new (m: bigint) => any; mod: any }>("mod.ts", ["Mod", "mod"]);
  const arithmetic = new Mod(11n);
  assert.equal(arithmetic.pow(3n, 4n), 4n); assert.equal(arithmetic.div(6n, 2n), 3n);
  assert.equal(arithmetic.fac(5n), 10n); assert.equal(arithmetic.nPr(5n, 3n), 5n * 4n * 3n % 11n);
  assert.equal(mod.mul(4n, 5n), 20n);
});
