import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("answers prefix and half-open range sum queries", () => {
  const { CumulativeSum } = loadLibrary<{ CumulativeSum: new (a: number[]) => any }>("cumulative-sum.ts", ["CumulativeSum"]);
  const sums = new CumulativeSum([2, 4, 6]); assert.equal(sums.rangeSum(1, 3), 10); assert.equal(sums.sum(2), 12);
});
