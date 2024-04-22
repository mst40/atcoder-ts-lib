function nCr(n: number, r: number, Mod: number) {
    if (n - r < r) r = n - r;
    if (r === 0) return 1;
    if (r === 1) return n;

    const numerator: number[] = new Array(r);
    const denominator: number[] = new Array(r);
    for (let k = 0; k < r; k++) {
      numerator[k] = n - r + k + 1;
      denominator[k] = k + 1;
    }

    for (let p = 2; p <= r; p++) {
      const pivot = denominator[p - 1];
      if (pivot > 1) {
        const offset = (n - r) % p;
        for (let k = p - 1; k < r; k += p) {
          numerator[k - offset] /= pivot;
          denominator[k] /= pivot;
        }
      }
    }

    return numerator.reduce((acc, a) => {
      if (a === 1) return acc;
      const t = acc * a;
      return t < 2 ** 53 ? t % Mod : ((((acc >> 16) * a) % Mod) * 65536 + (acc & 65535) * a) % Mod;
    });
  }
