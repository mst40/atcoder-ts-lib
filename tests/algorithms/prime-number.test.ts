import test from "node:test";
import { deepEqual, loadLibrary } from "../helpers";
test("generates primes and distinct prime factors", () => {
  const { sieveOfEratosthenes, primeFactorize } = loadLibrary<{ sieveOfEratosthenes: Function; primeFactorize: Function }>("prime-number.ts", ["sieveOfEratosthenes", "primeFactorize"]);
  deepEqual(sieveOfEratosthenes(12), [2, 3, 5, 7, 11]);
  deepEqual(primeFactorize(60), [2, 3, 5]);
});
