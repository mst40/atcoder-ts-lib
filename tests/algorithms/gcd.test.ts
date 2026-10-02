import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("calculates the greatest common divisor", () => {
  const { gcd } = loadLibrary<{ gcd: Function }>("gcd.ts", ["gcd"]);
  assert.equal(gcd(48, 18), 6);
});
