// return a prime number list of values up to N
// O(N)
function sieveOfEratosthenes(N: number): number[] {
  let list: boolean[] = new Array(N + 1).fill(true);
  const res: number[] = [];
  for (let i = 2; i <= N; i++) {
    if (list[i]) {
      res.push(i);
      for (let j = 2; j <= Math.floor(N / i); j++) {
        list[i * j] = false;
      }
    }
  }
  return res;
}

// return prime factor list of N
// O(logN)
function primeFactorize(v: number): number[] {
  const res: number[] = [];
  for (let i = 2; i * i <= v; i++) {
    if (v % i) continue;
    res.push(i);
    while (v % i == 0) {
      v /= i;
    }
  }
  if (v !== 1) res.push(v);
  return res;
}
