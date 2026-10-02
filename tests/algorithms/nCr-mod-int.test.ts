import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("calculates combinations modulo a number", () => {
  const { nCrModInt } = loadLibrary<{ nCrModInt: new (m: number, max: number) => any }>("nCr-mod-int.ts", ["nCrModInt"]);
  assert.equal(new nCrModInt(101, 10).nCr(5, 2), 10);
});
