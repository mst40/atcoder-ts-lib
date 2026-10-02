import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("calculates the Euclidean distance between two points", () => {
  const { calXYdir } = loadLibrary<{ calXYdir: Function }>("calculate-XYdirection.ts", ["calXYdir"]);
  assert.equal(calXYdir(0, 0, 3, 4), 5);
});
