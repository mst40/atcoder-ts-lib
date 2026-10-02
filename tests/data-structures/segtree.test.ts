import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("supports point updates and range assignments and queries", () => {
  const { SegmentTree, LazySegTree } = loadLibrary<{ SegmentTree: new (a: number[], f: any) => any; LazySegTree: new (a: number[], f: any) => any }>("segtree.ts", ["SegmentTree", "LazySegTree"]);
  const tree = new SegmentTree([2, 1, 5, 3], "sum"); assert.equal(tree.query(1, 4), 9); tree.update(1, 7); assert.equal(tree.get(1), 7);
  const lazy = new LazySegTree([2, 1, 5, 3], "sum"); lazy.update(1, 3, 4); assert.equal(lazy.query(0, 4), 13); assert.equal(lazy.get(2), 4);
});
