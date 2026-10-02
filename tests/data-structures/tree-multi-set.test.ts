import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("stores duplicates and provides ordered queries", () => {
  const { TreeMultiSet } = loadLibrary<{ TreeMultiSet: new () => any }>("tree-multi-set.ts", ["TreeMultiSet"]);
  const set = new TreeMultiSet(); [2, 2, 1, 4].forEach((x) => set.insert(x));
  assert.equal(set.count(2), 2); assert.equal(set.lower_bound(3), 4); assert.equal(set.upper_bound(2), 4);
  assert.equal(set.prev(2), 1); assert.equal(set.next(2), 4); assert.equal(set.remove(2), true); assert.equal(set.count(2), 1);
});
