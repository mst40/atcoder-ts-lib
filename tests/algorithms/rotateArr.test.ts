import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("rotates a square array clockwise", () => {
  const { rotate } = loadLibrary<{ rotate: Function }>("rotateArr.ts", ["rotate"]);
  deepEqual(rotate([["a", "b"], ["c", "d"]]), [["c", "a"], ["d", "b"]]);
});
