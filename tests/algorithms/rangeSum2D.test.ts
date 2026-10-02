import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("sums cells in a half-open rectangular range", () => {
  const { rangeSum2D } = loadLibrary<{ rangeSum2D: Function }>("rangeSum2D.ts", ["rangeSum2D"]);
  assert.equal(rangeSum2D([[1, 2], [3, 4]], 0, 2, 0, 2), 10);
});
