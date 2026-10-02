import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("generates combinations from arrays and integer ranges", () => {
  const { combinations, combinations0toM } = loadLibrary<{ combinations: Function; combinations0toM: Function }>("combinations.ts", ["combinations", "combinations0toM"]);
  deepEqual(combinations([1, 2, 3], 2), [[1, 2], [1, 3], [2, 3]]);
  deepEqual(combinations0toM(3, 2), [[0, 1], [0, 2], [1, 2]]);
});
