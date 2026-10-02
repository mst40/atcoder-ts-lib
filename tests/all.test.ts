import test from "node:test";
import { libraryFiles, assert } from "./helpers";

test("a dedicated test file exists for every TypeScript library file", () => {
  const tested = new Set([
    "Hopcroft-Karp.ts", "avl-tree.ts", "base-conversion.ts", "big-sort.ts",
    "big-sqrt.ts", "bitwise-enumeration.ts", "calculate-XYdirection.ts",
    "combinations.ts", "cumulative-sum.ts", "cumulativeSum2D.ts",
    "double-ended-que.ts", "doubly-linked-list.ts", "fenwick-tree.ts", "gcd.ts",
    "imos.ts", "lcm.ts", "lower-bound.ts", "lrud.ts", "math.ts", "merge-sort.ts",
    "mod-int.ts", "mod.ts", "nCr-mod-int.ts", "ncr-mod.ts", "permutation.ts",
    "prime-number.ts", "priority-queue.ts", "rangeSum2D.ts", "rotateArr.ts",
    "segtree.ts", "tree-multi-set.ts", "trie-tree.ts", "union-find.ts",
    "upper-bound.ts", "z-algorithm.ts",
  ]);
  assert.deepEqual(libraryFiles(), [...tested].sort());
});
