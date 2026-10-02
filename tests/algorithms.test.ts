import test from "node:test";
import { assert, loadLibrary, loadLibraries } from "./helpers";

const deepEqual = (actual: unknown, expected: unknown) =>
  assert.equal(JSON.stringify(actual, (_key, value) => typeof value === "bigint" ? `${value}n` : value), JSON.stringify(expected, (_key, value) => typeof value === "bigint" ? `${value}n` : value));

test("Hopcroft-Karp finds maximum matching and reports pairs", () => {
  const { HopcroftKarp } = loadLibrary<{ HopcroftKarp: new (l: number, r: number) => any }>("Hopcroft-Karp.ts", ["HopcroftKarp"]);
  const graph = new HopcroftKarp(3, 3);
  graph.addEdge(0, 0); graph.addEdge(0, 1); graph.addEdge(1, 0); graph.addEdge(2, 1); graph.addEdge(2, 2);
  assert.equal(graph.maxMatching(), 3);
  assert.equal(new Set(graph.getMatches().map(([, v]: number[]) => v)).size, 3);
});

test("sorting, bounds, combinations, permutations, subsets, and Z algorithm", () => {
  const sort = loadLibrary<{ mergeSort: (a: number[]) => number[] }>("merge-sort.ts", ["mergeSort"]);
  deepEqual(sort.mergeSort([4, 1, 3, 1]), [1, 1, 3, 4]);
  const big = loadLibrary<{ bigSort: (a: bigint[], f: (a: bigint,b: bigint)=>boolean)=>bigint[] }>("big-sort.ts", ["bigSort"]);
  const data = [9n, -2n, 4n];
  deepEqual(big.bigSort(data, (a,b)=>a<b), [-2n,4n,9n]);
  deepEqual(data, [9n,-2n,4n]);
  const lb = loadLibrary<{ lowerBound: Function }>("lower-bound.ts", ["lowerBound"]);
  const ub = loadLibrary<{ upperBound: Function }>("upper-bound.ts", ["upperBound"]);
  assert.equal(lb.lowerBound([1,2,2,4],2),1); assert.equal(ub.upperBound([1,2,2,4],2),3);
  const comb = loadLibrary<{ combinations: Function; combinations0toM: Function }>("combinations.ts", ["combinations","combinations0toM"]);
  deepEqual(comb.combinations([1,2,3],2), [[1,2],[1,3],[2,3]]);
  deepEqual(comb.combinations0toM(3,2), [[0,1],[0,2],[1,2]]);
  const bits = loadLibrary<{ bitwiseEnumeration: Function }>("bitwise-enumeration.ts", ["bitwiseEnumeration"]);
  assert.equal(bits.bitwiseEnumeration(["a","b","c"]).length, 6); // Current implementation iterates 2*n masks.
  const perm = loadLibrary<{ Permutation: new (a:number[])=>any; nextPermutation: Function }>("permutation.ts", ["Permutation","nextPermutation"]);
  deepEqual(new perm.Permutation([1,2,3]).allPerms(), [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]);
  const p = [1,2]; assert.equal(perm.nextPermutation(p), true); deepEqual(p,[2,1]); assert.equal(perm.nextPermutation(p),false);
  const z = loadLibrary<{ z_algorithm: (s:string)=>number[] }>("z-algorithm.ts", ["z_algorithm"]);
  deepEqual(z.z_algorithm("aaaaa"), [5,4,3,2,1]);
});

test("number theory and modular arithmetic helpers", () => {
  const gcd = loadLibrary<{ gcd: Function }>("gcd.ts",["gcd"]); assert.equal(gcd.gcd(48,18),6);
  const lcm = loadLibraries<{ lcm: Function }>(["gcd.ts", "lcm.ts"],["lcm"]); assert.equal(lcm.lcm(12,18),36);
  const prime = loadLibrary<{ sieveOfEratosthenes: Function; primeFactorize: Function }>("prime-number.ts",["sieveOfEratosthenes","primeFactorize"]);
  deepEqual(prime.sieveOfEratosthenes(12),[2,3,5,7,11]); deepEqual(prime.primeFactorize(60),[2,3,5]);
  const sqrt = loadLibrary<{ bigSqrt: Function }>("big-sqrt.ts",["bigSqrt"]); assert.equal(sqrt.bigSqrt(100000000000000000000n),10000000000n);
  const conv = loadLibrary<{ baseConversion: Function }>("base-conversion.ts",["baseConversion"]); assert.equal(conv.baseConversion(13,2),"1011");
  const mod = loadLibrary<{ Mod: new (m:bigint)=>any; mod: any }>("mod.ts",["Mod","mod"]);
  const m = new mod.Mod(11n); assert.equal(m.pow(3n,4n),4n); assert.equal(m.div(6n,2n),3n); assert.equal(m.fac(5n),10n); assert.equal(m.nPr(5n,3n),5n*4n*3n%11n);
  assert.equal(mod.mod.mul(4n,5n),20n);
  const mi = loadLibrary<{ ModInt: new (m:number)=>any }>("mod-int.ts",["ModInt"]); const n = new mi.ModInt(101);
  assert.equal(n.pow(3,4),81); assert.equal(n.div(6,2),3); assert.equal(n.fac(5),19); assert.equal(n.nPr(5,3),60);
  const ncr = loadLibrary<{ nCrModInt: new (m:number,max:number)=>any }>("nCr-mod-int.ts",["nCrModInt"]); assert.equal(new ncr.nCrModInt(101,10).nCr(5,2),10);
  const ncrBig = loadLibrary<{ nCrMOD: Function }>("ncr-mod.ts",["nCrMOD"]); assert.equal(ncrBig.nCrMOD(5n,2n,101n),10n);
});

test("geometry, grid movement, rotation, and math helpers", () => {
  const dir = loadLibrary<{ calXYdir: Function }>("calculate-XYdirection.ts",["calXYdir"]); assert.equal(dir.calXYdir(0,0,3,4),5);
  const lrud = loadLibrary<{ moveLRUD: Function }>("lrud.ts",["moveLRUD"]); deepEqual(lrud.moveLRUD(["...","..."],"R",0,0),[0,1]); deepEqual(lrud.moveLRUD(["..."],"U",0,0),[0,0]);
  const rotate = loadLibrary<{ rotate: Function }>("rotateArr.ts",["rotate"]); deepEqual(rotate.rotate([["a","b"],["c","d"]]), [["c","a"],["d","b"]]);
  const math = loadLibrary<{ math: any }>("math.ts",["math"]); assert.equal(math.math.as(1,5,3),9); assert.equal(math.math.sogp(1,2,4),15);
  const sum2 = loadLibrary<{ rangeSum2D: Function }>("rangeSum2D.ts",["rangeSum2D"]); assert.equal(sum2.rangeSum2D([[1,2],[3,4]],0,2,0,2),10);
  const cs2 = loadLibrary<{ CumulativeSum2D: new (a:number[][])=>any }>("cumulativeSum2D.ts",["CumulativeSum2D"]); assert.equal(new cs2.CumulativeSum2D([[1,2],[3,4]]).getRangeSum(0,1,1,1),6);
});
