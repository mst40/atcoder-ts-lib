class LazySegTree {
  tree: number[];
  len: number;
  fn: (a: number, b: number) => number;
  lazy: number[];
  init: number;
  constructor(ary: number[], func: "sum" | "max" | "min" | "mul" | "gcd") {
    this.len = 2 ** Math.ceil(Math.log2(ary.length));
    this.init = this._segInit[func];
    this.fn = (a: number, b: number) => this._segFunc[func](a, b);
    this.tree = new Array(2 * this.len - 1).fill(this.init);
    this.lazy = new Array(2 * this.len - 1).fill(this.init);
    ary.map((v, i) => this.update(i, i + 1, v));
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

  // lazy eval
  eval(t: number): void {
    if (this.lazy[t] === this.init) {
      return;
    }
    // 子ノードに伝播
    if (t < this.len - 1) {
      this.lazy[t * 2 + 1] = this.lazy[t];
      this.lazy[t * 2 + 2] = this.lazy[t];
    }
    // 自身に反映＆初期化
    this.tree[t] = this.lazy[t];
    this.lazy[t] = this.init;
  }

  // update [a,b) to x
  update(a: number, b: number, x: number): void {
    this._updateHelper(a, b, x, 0, 0, this.len);
  }

  // the value of t
  get(t: number): number {
    t += this.len - 1;
    return this.tree[t];
  }

  query(a: number, b: number): number {
    return this._queryHelper(a, b, 0, 0, this.len);
  }

  /* helper functions */
  private _updateHelper(a: number, b: number, x: number, t: number, l: number, r: number) {
    this.eval(t);
    if (a <= l && r <= b) {
      this.lazy[t] = x;
      this.eval(t);
    } else if (l < b && a < r) {
      this._updateHelper(a, b, x, t * 2 + 1, l, Math.floor((l + r) / 2));
      this._updateHelper(a, b, x, t * 2 + 2, Math.floor((l + r) / 2), r);
      this.tree[t] = this.fn(this.tree[t * 2 + 1], this.tree[t * 2 + 2]); ///////////////////editable
    }
  }
  private _queryHelper(a: number, b: number, t: number, l: number, r: number): number {
    this.eval(t);
    if (b <= l || r <= a) {
      return this.init;
    } else if (a <= l && r <= b) {
      return this.tree[t];
    } else {
      const vl = this._queryHelper(a, b, t * 2 + 1, l, Math.floor((l + r) / 2));
      const vr = this._queryHelper(a, b, t * 2 + 2, Math.floor((l + r) / 2), r);
      return this.fn(vl, vr);
    }
  }

  debug() {
    console.log("len", this.len);
    console.log("tree", this.tree);
    console.log("lazy", this.lazy);
  }
}
