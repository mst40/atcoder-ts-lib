// 0 < n < 1e5+1
function nCrMOD(n: bigint, r: bigint, mod: bigint) {
  const fac: bigint[] = new Array(n + 1n).fill(0n);
  const inv: bigint[] = new Array(n + 1n).fill(0n);
  const finv: bigint[] = new Array(n + 1n).fill(0n);

  fac[0] = fac[1] = 1n; // iまでの階乗をmodした値
  finv[0] = finv[1] = 1n; // fac[i]の逆元
  inv[1] = 1n; // mod の逆元　i * x % mod = 1 となるときの　x
  for (let i = 2; i <= n; i++) {
    fac[i] = (fac[i - 1] * BigInt(i)) % mod;
    inv[i] = mod - ((inv[Number(mod) % i] * (mod / BigInt(i))) % mod);
    finv[i] = (finv[i - 1] * inv[i]) % mod;
  }
  console.log(fac, finv, inv);

  if (n < r) return 0;
  if (n < 0 || r < 0) return 0;
  return (fac[Number(n)] * ((finv[Number(r)] * finv[Number(n - r)]) % mod)) % mod;
}

console.log(nCr(4n, 2n, 10n ** 9n + 7n));
