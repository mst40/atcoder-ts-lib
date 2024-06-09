const math = {
  // 等差数列の和 Arithmetic Series
  // i:初項 l:末項 n:項数
  as: (i: number, l: number, n: number) => {
    return (n / 2) * (i + l);
  },

  // 等比数列の和　Sum of Geometric Progressions
  // i:初項 r:公比 n:項数
  sogp: (i: number, r: number, n: number) => {
    return i * ((r ** n - 1) / (r - 1));
  },
};
