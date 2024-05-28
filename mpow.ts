const mpow = (base: bigint, expo: bigint, m: bigint) => {
  if (expo === 0n) {
    return 1n;
  } else {
    const k: bigint = mpow(base, expo / 2n, m);
    if (expo % 2n === 1n) {
      return (k * k * base) % m;
    } else {
      return (k * k) % m;
    }
  }
};
