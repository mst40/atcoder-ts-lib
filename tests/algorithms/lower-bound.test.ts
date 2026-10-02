import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("returns the first index whose value is at least the target", () => {
  const { lowerBound } = loadLibrary<{ lowerBound: Function }>("lower-bound.ts", ["lowerBound"]);
  assert.equal(lowerBound([1, 2, 2, 4], 2), 1);
  assert.equal(lowerBound([1, 2, 4], 5), 3);
});
