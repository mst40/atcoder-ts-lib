import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("calculates arithmetic and geometric series sums", () => {
  const { math } = loadLibrary<{ math: any }>("math.ts", ["math"]);
  assert.equal(math.as(1, 5, 3), 9);
  assert.equal(math.sogp(1, 2, 4), 15);
});
