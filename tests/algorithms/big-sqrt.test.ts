import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("returns the integer square root of a bigint", () => {
  const { bigSqrt } = loadLibrary<{ bigSqrt: Function }>("big-sqrt.ts", ["bigSqrt"]);
  assert.equal(bigSqrt(100000000000000000000n), 10000000000n);
  assert.equal(bigSqrt(0n), 0n);
});
