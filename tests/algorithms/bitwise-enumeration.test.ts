import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("enumerates the masks produced by the current implementation", () => {
  const { bitwiseEnumeration } = loadLibrary<{ bitwiseEnumeration: Function }>("bitwise-enumeration.ts", ["bitwiseEnumeration"]);
  assert.equal(bitwiseEnumeration(["a", "b", "c"]).length, 6);
});
