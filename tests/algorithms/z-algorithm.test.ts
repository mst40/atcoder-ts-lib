import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("returns prefix match lengths for each suffix", () => {
  const { z_algorithm } = loadLibrary<{ z_algorithm: Function }>("z-algorithm.ts", ["z_algorithm"]);
  deepEqual(z_algorithm("aaaaa"), [5, 4, 3, 2, 1]);
});
