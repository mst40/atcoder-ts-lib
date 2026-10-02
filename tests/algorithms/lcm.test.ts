import test from "node:test";
import { assert, loadLibraries } from "../helpers";
test("calculates the least common multiple using gcd", () => {
  const { lcm } = loadLibraries<{ lcm: Function }>(["gcd.ts", "lcm.ts"], ["lcm"]);
  assert.equal(lcm(12, 18), 36);
});
