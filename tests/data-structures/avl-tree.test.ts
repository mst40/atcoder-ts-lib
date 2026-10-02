import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("supports ordered insertion, neighbors, and removal", () => {
  const { AVL_Tree } = loadLibrary<{ AVL_Tree: new () => any }>("avl-tree.ts", ["AVL_Tree"]);
  const tree = new AVL_Tree(); [3, 1, 5, 2, 4].forEach((x) => tree.insert(x));
  assert.equal(tree.min(), 1); assert.equal(tree.max(), 5); assert.equal(tree.prev(3), 2); assert.equal(tree.next(3), 4);
  assert.equal(tree.remove(1), true); assert.equal(tree.min(), 2);
});
