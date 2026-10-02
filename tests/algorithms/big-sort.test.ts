import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("sorts bigints without mutating the input", () => {
  const { bigSort } = loadLibrary<{ bigSort: Function }>("big-sort.ts", ["bigSort"]);
  const values = [9n, -2n, 4n];
  deepEqual(bigSort(values, (a: bigint, b: bigint) => a < b), [-2n, 4n, 9n]);
  deepEqual(values, [9n, -2n, 4n]);
});
