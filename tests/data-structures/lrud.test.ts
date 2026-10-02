import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("moves within a grid and stays in place at an edge", () => {
  const { moveLRUD } = loadLibrary<{ moveLRUD: Function }>("lrud.ts", ["moveLRUD"]);
  deepEqual(moveLRUD(["...", "..."], "R", 0, 0), [0, 1]); deepEqual(moveLRUD(["..."], "U", 0, 0), [0, 0]);
});
