import test from "node:test";
import { assert, deepEqual, loadLibrary } from "../helpers";

test("decomposes strongly connected components and builds the condensation DAG", () => {
  const { SCC } = loadLibrary<{ SCC: new (n: number) => any }>("SCC.ts", ["SCC"]);
  const graph = new SCC(6);
  graph.addEdge(0, 1);
  graph.addEdge(1, 0);
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 2);
  graph.addEdge(3, 4);
  graph.addEdge(4, 5);
  graph.addEdge(5, 4);
  graph.solve();

  assert.equal(graph.scc.length, 3);
  deepEqual(graph.scc.map((component: number[]) => [...component].sort((a, b) => a - b)), [
    [0, 1], [2, 3], [4, 5],
  ]);
  deepEqual(graph.cmp, [0, 0, 1, 1, 2, 2]);
  deepEqual(graph.dag, [[1], [2], []]);
});

test("handles isolated vertices, self-loops, and duplicate edges", () => {
  const { SCC } = loadLibrary<{ SCC: new (n: number) => any }>("SCC.ts", ["SCC"]);
  const graph = new SCC(4);
  graph.addEdge(0, 0);
  graph.addEdge(0, 1);
  graph.addEdge(0, 1);
  graph.addEdge(1, 2);
  graph.addEdge(1, 2);
  graph.solve();

  assert.equal(graph.scc.length, 4);
  deepEqual(graph.cmp.map((id: number) => graph.scc[id].length), [1, 1, 1, 1]);
  assert.equal(graph.dag.reduce((count: number, edges: number[]) => count + edges.length, 0), 2);
  deepEqual(graph.dag[graph.cmp[0]], [graph.cmp[1]]);
  deepEqual(graph.dag[graph.cmp[1]], [graph.cmp[2]]);
  assert.equal(graph.dag[graph.cmp[2]].length, 0);
  assert.equal(graph.dag[graph.cmp[3]].length, 0);
});

test("supports an empty graph", () => {
  const { SCC } = loadLibrary<{ SCC: new (n: number) => any }>("SCC.ts", ["SCC"]);
  const graph = new SCC(0);
  graph.solve();

  deepEqual(graph.scc, []);
  deepEqual(graph.cmp, []);
  deepEqual(graph.dag, []);
});
