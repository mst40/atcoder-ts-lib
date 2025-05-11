class nCrModInt {
  mod: number;
  MAX: number;
  fac: number[];
  inv: number[];
  finv: number[];

  constructor(mod: number, max: number) {
    this.mod = mod;
    this.MAX = max;

    this.fac = new Array(this.MAX).fill(0);
    this.inv = new Array(this.MAX).fill(0);
    this.finv = new Array(this.MAX).fill(0);

    this.fac[0] = this.fac[1] = 1;
    this.finv[0] = this.finv[1] = 1;
    this.inv[1] = 1;

    for (let i = 2; i < this.MAX; i++) {
      this.fac[i] = this.mul(this.fac[i - 1], i);
      this.inv[i] = this.mod - this.mul(this.inv[this.mod % i], Math.floor(this.mod / i));
      this.finv[i] = this.mul(this.finv[i - 1], this.inv[i]);
    }
  }

  private mul(a: number, b: number): number {
    let r = (a >> 20) * (b >> 20) * (2 ** 40 % this.mod) + (a & 0xfff00000) * (b & 0xfffff) + (a & 0xfffff) * b;
    return r % this.mod;
  }

  nCr(n: number, r: number): number {
    if (n < r || n < 0 || r < 0) return 0;
    return this.mul(this.mul(this.fac[n], this.finv[r]), this.finv[n - r]);
  }
}
