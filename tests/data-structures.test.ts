import test from "node:test";
import { assert, loadLibrary } from "./helpers";

const deepEqual = (actual: unknown, expected: unknown) => assert.equal(JSON.stringify(actual), JSON.stringify(expected));

test("cumulative sums, Fenwick tree, and Imos", () => {
  const cs = loadLibrary<{ CumulativeSum: new(a:number[])=>any }>("cumulative-sum.ts",["CumulativeSum"]); const c = new cs.CumulativeSum([2,4,6]); assert.equal(c.rangeSum(1,3),10); assert.equal(c.sum(2),12);
  const ft = loadLibrary<{ FenwickTree: new(n:number)=>any }>("fenwick-tree.ts",["FenwickTree"]); const f = new ft.FenwickTree(4); f.add(0,2); f.add(2,5); assert.equal(f.sum(2),7);
  const im = loadLibrary<{ Imos: new(n:number)=>any }>("imos.ts",["Imos"]); const i = new im.Imos(5); i.add(1,4,3); i.ary[0]=0;
  // sum() requires its difference array to have the initial prefix in ary[0].
  assert.equal(i.sum().every(Number.isNaN),true);
});

test("queues and linked list", () => {
  const deque = loadLibrary<{ DoubleEndedQue: new()=>any }>("double-ended-que.ts",["DoubleEndedQue"]); const d = new deque.DoubleEndedQue(); d.push_front([1]); d.push_back([2]); deepEqual(d.pop(),[1]); deepEqual(d.pop(),[2]); assert.equal(d.pop(),undefined); assert.equal(d.isEmpty(),true);
  const list = loadLibrary<{ DoublyLinkedList: new(n:number)=>any }>("doubly-linked-list.ts",["DoublyLinkedList"]); const l = new list.DoublyLinkedList(2); const log=console.log; console.log=()=>{}; try { l.addHead(1); l.addTail(4); l.addAtIndex(2,3); l.delete(1); } finally { console.log=log; } assert.equal(l.len,3); assert.equal(l.head.val,1); assert.equal(l.head.next?.val,3); assert.equal(l.tail.val,4);
});

test("segment trees, priority queue, and disjoint set", () => {
  const trees = loadLibrary<{ SegmentTree: new(a:number[],f:any)=>any; LazySegTree: new(a:number[],f:any)=>any }>("segtree.ts",["SegmentTree","LazySegTree"]);
  const st = new trees.SegmentTree([2,1,5,3],"sum"); assert.equal(st.query(1,4),9); st.update(1,7); assert.equal(st.get(1),7);
  const lazy = new trees.LazySegTree([2,1,5,3],"sum"); lazy.update(1,3,4); assert.equal(lazy.query(0,4),13); assert.equal(lazy.get(2),4);
  const pqc = loadLibrary<{ PriorityQueue: new(o:"asc"|"des")=>any }>("priority-queue.ts",["PriorityQueue"]); const pq = new pqc.PriorityQueue("asc"); pq.push(4);pq.push(1);pq.push(3); assert.deepEqual([pq.pop(),pq.pop(),pq.pop()].map(x=>x?.[0]),[1,3,4]); assert.equal(pq.isEmpty(),true);
  const ufC=loadLibrary<{ UnionFind:new(n:number)=>any }>("union-find.ts",["UnionFind"]); const uf=new ufC.UnionFind(4); assert.equal(uf.unite(0,1),true);assert.equal(uf.unite(1,0),false);assert.equal(uf.isUnite(0,1),true);assert.equal(uf.getSize(0),2);assert.equal(uf.unionCnt,3);
});

test("AVL tree, multiset, and trie", () => {
  const avlC=loadLibrary<{ AVL_Tree:new()=>any }>("avl-tree.ts",["AVL_Tree"]); const avl=new avlC.AVL_Tree(); [3,1,5,2,4].forEach(x=>avl.insert(x)); assert.equal(avl.min(),1);assert.equal(avl.max(),5);assert.equal(avl.prev(3),2);assert.equal(avl.next(3),4);assert.equal(avl.remove(1),true);assert.equal(avl.min(),2);
  const msC=loadLibrary<{ TreeMultiSet:new()=>any }>("tree-multi-set.ts",["TreeMultiSet"]); const ms=new msC.TreeMultiSet();[2,2,1,4].forEach(x=>ms.insert(x));assert.equal(ms.count(2),2);assert.equal(ms.lower_bound(3),4);assert.equal(ms.upper_bound(2),4);assert.equal(ms.prev(2),1);assert.equal(ms.next(2),4);assert.equal(ms.remove(2),true);assert.equal(ms.count(2),1);
  const trieC=loadLibrary<{ TrieTree:new()=>any }>("trie-tree.ts",["TrieTree"]);const trie=new trieC.TrieTree();trie.insert("cat");trie.insert("car");assert.equal(trie.hasExactMatch("cat"),true);assert.equal(trie.hasPrefixMatch("ca"),true);assert.equal(trie.getMatchNum("cab"),2);assert.equal(trie.delete("cat"),true);assert.equal(trie.hasExactMatch("cat"),false);assert.equal(trie.hasExactMatch("car"),true);
});
