import test from "node:test";
import { assert, deepEqual, loadLibrary } from "../helpers";
test("pops values in ascending priority order", () => {
  const { PriorityQueue } = loadLibrary<{ PriorityQueue: new (o: "asc" | "des") => any }>("priority-queue.ts", ["PriorityQueue"]);
  const queue = new PriorityQueue("asc"); queue.push(4); queue.push(1); queue.push(3);
  deepEqual([queue.pop(), queue.pop(), queue.pop()].map((x: any) => x?.[0]), [1, 3, 4]); assert.equal(queue.isEmpty(), true);
});
