class ModInt {
  mod: number;
  constructor(mod: number) {
    this.mod = mod;
  }
  mul = (a: number, b: number) => {
    let r = (a >> 20) * (b >> 20) * (2 ** 40 % this.mod) + (a & 0xfff00000) * (b & 0xfffff) + (a & 0xfffff) * b;
    return r % this.mod;
  };
  // a ** n % mod
  pow(a: number, n: number): number {
    if (n === 0) return 1;
    if (n % 2 === 1) return this.mul(a, this.pow(a, n - 1));
    else return this.pow(this.mul(a, a), Math.floor(n / 2));
  }
  // a の逆元(inverse element)
  // a * inv(a) = 1
  //*1
  inv(a: number) {
    return this.pow(a, this.mod - 2);
  }
  // p/q % mod
  // 逆元があるときのみ有効
  div(p: number, q: number) {
    return this.mul(p, this.inv(q));
  }
  nPr(x: number, r: number): number {
    let res: number = x;
    for (let i = 1; i < r; i++) {
      res *= x - i;
      res %= this.mod;
    }
    return res;
  }
  fac(x: number): number {
    let res: number = 1;
    for (let i = 2; i <= x; i++) {
      res *= i;
      res %= this.mod;
    }
    return res;
  }
}
