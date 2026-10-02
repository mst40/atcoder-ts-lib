import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("converts a positive integer to a base representation", () => {
  const { baseConversion } = loadLibrary<{ baseConversion: Function }>("base-conversion.ts", ["baseConversion"]);
  assert.equal(baseConversion(13, 2), "1011");
});
