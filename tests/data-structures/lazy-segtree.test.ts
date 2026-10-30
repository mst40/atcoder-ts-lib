import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";

type S = { sum: number; size: number };
type F = { a: number; b: number };
type LazySegTreeApi = {
  get: (p: number) => S;
  set: (p: number, x: S) => void;
  prod: (l: number, r: number) => S;
  apply: (l: number, r: number, f: F) => void;
};
type LazySegTreeConstructor = new (
  op: (a: S, b: S) => S,
  e: () => S,
  mapping: (f: F, x: S) => S,
  composition: (f: F, g: F) => F,
  id: () => F,
  values: S[],
) => LazySegTreeApi;

function createTree(values: number[]): LazySegTreeApi {
  const { LazySegTree } = loadLibrary<{ LazySegTree: LazySegTreeConstructor }>("lazy-segtree.ts", ["LazySegTree"]);
  return new LazySegTree(
    (a, b) => ({ sum: a.sum + b.sum, size: a.size + b.size }),
    () => ({ sum: 0, size: 0 }),
    (f, x) => ({ sum: f.a * x.sum + f.b * x.size, size: x.size }),
    (f, g) => ({ a: f.a * g.a, b: f.a * g.b + f.b }),
    () => ({ a: 1, b: 0 }),
    values.map((sum) => ({ sum, size: 1 })),
  );
}

test("applies and composes lazy range mappings", () => {
  const tree = createTree([1, 2, 3]);

  // Add 10 to [1, 3), then apply x -> 2x + 3 to [2, 3).
  tree.apply(1, 3, { a: 1, b: 10 });
  tree.apply(2, 3, { a: 2, b: 3 });

  deepEqual(tree.prod(0, 3), { sum: 42, size: 3 });
  deepEqual(tree.prod(1, 3), { sum: 41, size: 2 });
  deepEqual(tree.get(2), { sum: 29, size: 1 });
});

test("supports point set and empty range product", () => {
  const tree = createTree([1, 2, 3]);
  tree.apply(0, 3, { a: 1, b: 5 });
  tree.set(1, { sum: 7, size: 1 });

  deepEqual(tree.get(0), { sum: 6, size: 1 });
  deepEqual(tree.get(1), { sum: 7, size: 1 });
  deepEqual(tree.prod(1, 1), { sum: 0, size: 0 });
  deepEqual(tree.prod(0, 3), { sum: 21, size: 3 });
});
