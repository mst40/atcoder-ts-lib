import test from "node:test";
import { assert, deepEqual, loadLibrary } from "../helpers";
test("pushes and pops values at both ends", () => {
  const { DoubleEndedQue } = loadLibrary<{ DoubleEndedQue: new () => any }>("double-ended-que.ts", ["DoubleEndedQue"]);
  const deque = new DoubleEndedQue(); deque.push_front([1]); deque.push_back([2]);
  deepEqual(deque.pop(), [1]); deepEqual(deque.pop(), [2]); assert.equal(deque.pop(), undefined); assert.equal(deque.isEmpty(), true);
});
