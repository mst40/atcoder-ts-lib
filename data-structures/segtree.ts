class SegmentTree {
  // func = { 区間和: "sum", 最大値: "max", 最小値: "min", 積: "mul", 最大公約数: "gcd" }
  fn: (a: number, b: number) => number;
  init: number;
  len: number;
  tree: number[];

  constructor(ary: number[], func: "sum" | "max" | "min" | "mul" | "gcd") {
    this.fn = (a: number, b: number) => this._segFunc[func](a, b);
    this.init = this._segInit[func];
    this.len = 2 ** Math.ceil(Math.log2(ary.length));
    this.tree = new Array(2 * this.len - 1).fill(this.init);
    ary.map((e, i) => this.update(i, e));
  }
  private _segFunc = {
    sum: (a: number, b: number): number => a + b,
    max: (a: number, b: number): number => Math.max(a, b),
    min: (a: number, b: number): number => Math.min(a, b),
    mul: (a: number, b: number): number => a * b,
    gcd: (a: number, b: number): number => (b ? this._segFunc.gcd(b, a % b) : a),
  };
  private _segInit = {
    sum: 0,
    max: -Infinity,
    min: Infinity,
    mul: 1,
    gcd: 0,
  };
  // i番目をvに更新
  update(i: number, v: number) {
    i += this.len - 1;
    this.tree[i] = v;
    while (i > 0) {
      i = Math.floor((i - 1) / 2);
      this.tree[i] = this.fn(this.tree[i * 2 + 1], this.tree[i * 2 + 2]);
    }
  }
  // l以上r未満の区間での値を取得
  query = (a: number, b: number) => this._query_sub(a, b, 0, 0, this.len);

  private _query_sub(a: number, b: number, k: number, l: number, r: number): number {
    if (r <= a || b <= l) return this.init;
    else if (a <= l && r <= b) return this.tree[k];
    else {
      const vl = this._query_sub(a, b, k * 2 + 1, l, Math.floor((l + r) / 2));
      const vr = this._query_sub(a, b, k * 2 + 2, Math.floor((l + r) / 2), r);
      return this.fn(vl, vr);
    }
  }
  // i番目(0-based)の値を取得
  get = (i: number) => this.query(i, i + 1);
}
