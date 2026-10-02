import test from "node:test";
import { assert, loadLibrary } from "../helpers";

test("finds and reports a maximum matching", () => {
  const { HopcroftKarp } = loadLibrary<{ HopcroftKarp: new (l: number, r: number) => any }>("Hopcroft-Karp.ts", ["HopcroftKarp"]);
  const graph = new HopcroftKarp(3, 3);
  graph.addEdge(0, 0); graph.addEdge(0, 1); graph.addEdge(1, 0); graph.addEdge(2, 1); graph.addEdge(2, 2);
  assert.equal(graph.maxMatching(), 3);
  assert.equal(new Set(graph.getMatches().map(([, v]: number[]) => v)).size, 3);
});
