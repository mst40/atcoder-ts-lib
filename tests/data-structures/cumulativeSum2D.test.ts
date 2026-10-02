import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("answers inclusive rectangular prefix-sum queries", () => {
  const { CumulativeSum2D } = loadLibrary<{ CumulativeSum2D: new (a: number[][]) => any }>("cumulativeSum2D.ts", ["CumulativeSum2D"]);
  assert.equal(new CumulativeSum2D([[1, 2], [3, 4]]).getRangeSum(0, 1, 1, 1), 6);
});
