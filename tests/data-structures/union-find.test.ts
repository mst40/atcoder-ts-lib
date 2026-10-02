import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("unites components and reports connectivity, size, and count", () => {
  const { UnionFind } = loadLibrary<{ UnionFind: new (n: number) => any }>("union-find.ts", ["UnionFind"]);
  const uf = new UnionFind(4); assert.equal(uf.unite(0, 1), true); assert.equal(uf.unite(1, 0), false);
  assert.equal(uf.isUnite(0, 1), true); assert.equal(uf.getSize(0), 2); assert.equal(uf.unionCnt, 3);
});
