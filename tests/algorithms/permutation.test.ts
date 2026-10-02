import test from "node:test";
import { assert, deepEqual, loadLibrary } from "../helpers";
test("iterates permutations and advances an array in place", () => {
  const { Permutation, nextPermutation } = loadLibrary<{ Permutation: new (a: number[]) => any; nextPermutation: Function }>("permutation.ts", ["Permutation", "nextPermutation"]);
  deepEqual(new Permutation([1, 2, 3]).allPerms(), [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
  const values = [1, 2]; assert.equal(nextPermutation(values), true); deepEqual(values, [2, 1]); assert.equal(nextPermutation(values), false);
});
