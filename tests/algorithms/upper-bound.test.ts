import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("returns the first index whose value is greater than the target", () => {
  const { upperBound } = loadLibrary<{ upperBound: Function }>("upper-bound.ts", ["upperBound"]);
  assert.equal(upperBound([1, 2, 2, 4], 2), 3);
  assert.equal(upperBound([1, 2, 4], 5), 3);
});
