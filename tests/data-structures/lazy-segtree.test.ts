import test from "node:test";
import { assert, loadLibrary } from "../helpers";

test("supports range assignment and range queries", () => {
  const { LazySegTree } = loadLibrary<{ LazySegTree: new (a: number[], f: string) => any }>("lazy-segtree.ts", ["LazySegTree"]);
  const tree = new LazySegTree([2, 1, 5, 3], "sum");

  tree.update(1, 3, 4);
  assert.equal(tree.query(0, 4), 13);
  assert.equal(tree.query(1, 3), 4);
  assert.equal(tree.get(2), 4);
  tree.update(0, 4, 2);
  assert.equal(tree.query(0, 4), 8);
});

test("supports each configured aggregate for point assignments", () => {
  const { LazySegTree } = loadLibrary<{ LazySegTree: new (a: number[], f: string) => any }>("lazy-segtree.ts", ["LazySegTree"]);
  assert.equal(new LazySegTree([2, 3, 4], "max").query(0, 3), 4);
  assert.equal(new LazySegTree([2, 3, 4], "min").query(0, 3), 2);
  assert.equal(new LazySegTree([2, 3, 4], "mul").query(0, 3), 24);
  assert.equal(new LazySegTree([12, 18, 30], "gcd").query(0, 3), 6);
});

test("applies a pending assignment when a subrange is queried", () => {
  const { LazySegTree } = loadLibrary<{ LazySegTree: new (a: number[], f: string) => any }>("lazy-segtree.ts", ["LazySegTree"]);
  const tree = new LazySegTree([1, 2, 3, 4], "max");
  tree.update(0, 4, 7);

  assert.equal(tree.query(2, 3), 7);
});
