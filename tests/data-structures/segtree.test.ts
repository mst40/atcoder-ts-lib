import test from "node:test";
import { assert, loadLibrary } from "../helpers";

test("supports point updates and range queries", () => {
  const { SegmentTree } = loadLibrary<{ SegmentTree: new (a: number[], f: string) => any }>("segtree.ts", ["SegmentTree"]);
  const tree = new SegmentTree([2, 1, 5, 3], "sum");

  assert.equal(tree.query(1, 4), 9);
  assert.equal(tree.query(2, 2), 0);
  tree.update(1, 7);
  assert.equal(tree.get(1), 7);
  assert.equal(tree.query(0, 4), 17);
});

test("supports each configured aggregate", () => {
  const { SegmentTree } = loadLibrary<{ SegmentTree: new (a: number[], f: string) => any }>("segtree.ts", ["SegmentTree"]);
  assert.equal(new SegmentTree([2, 3, 4], "max").query(0, 3), 4);
  assert.equal(new SegmentTree([2, 3, 4], "min").query(0, 3), 2);
  assert.equal(new SegmentTree([2, 3, 4], "mul").query(0, 3), 24);
  assert.equal(new SegmentTree([12, 18, 30], "gcd").query(0, 3), 6);
});
