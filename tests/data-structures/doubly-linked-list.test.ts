import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("inserts and removes list nodes while keeping head and tail", () => {
  const { DoublyLinkedList } = loadLibrary<{ DoublyLinkedList: new (n: number) => any }>("doubly-linked-list.ts", ["DoublyLinkedList"]);
  const list = new DoublyLinkedList(2); const originalLog = console.log; console.log = () => {};
  try { list.addHead(1); list.addTail(4); list.addAtIndex(2, 3); list.delete(1); } finally { console.log = originalLog; }
  assert.equal(list.len, 3); assert.equal(list.head.val, 1); assert.equal(list.head.next?.val, 3); assert.equal(list.tail.val, 4);
});
