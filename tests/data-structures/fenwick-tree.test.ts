import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("updates points and returns prefix sums", () => {
  const { FenwickTree } = loadLibrary<{ FenwickTree: new (n: number) => any }>("fenwick-tree.ts", ["FenwickTree"]);
  const tree = new FenwickTree(4); tree.add(0, 2); tree.add(2, 5); assert.equal(tree.sum(2), 7);
});
