import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("calculates bigint combinations modulo a bigint", () => {
  const { nCrMOD } = loadLibrary<{ nCrMOD: Function }>("ncr-mod.ts", ["nCrMOD"]);
  assert.equal(nCrMOD(5n, 2n, 101n), 10n);
});
