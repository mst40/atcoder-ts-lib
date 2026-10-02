import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("sorts values in ascending order", () => {
  const { mergeSort } = loadLibrary<{ mergeSort: Function }>("merge-sort.ts", ["mergeSort"]);
  deepEqual(mergeSort([4, 1, 3, 1]), [1, 1, 3, 4]);
});
