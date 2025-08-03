// lazy eval Segment Tree (minimum)
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
    max: -1,
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
  private _min(a: number, b: number) {
    return a < b ? a : b;
  }
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

/** doc
 *
 * update 1:2 2:2 3:2 -> 1:3 2:3 3:3 = update(1,4,3)
 * query 1~3 = query(1,4)
 *
 */

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
    max: -1,
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

// const arr = new Array(12).fill(0).map((_, i) => i + 1);
// console.log(arr);
// const st = new LazySegTree(arr, "gcd");
// st.debug();
// const res: number[] = [];
// res.push(st.query(0, 10));
// res.push(st.get(0)); // 1
// res.push(st.get(1)); // 2
// res.push(st.get(2)); // 3
// res.push(st.get(3));
// res.push(st.get(4));
// res.push(st.get(5));
// res.push(st.get(6));
// res.push(st.get(7)); // 8
// res.push(st.get(8)); // 9
// res.push(st.get(9)); // 10

// res.push(st.query(0, 12));
// res.push(st.query(0, 11));
// res.push(st.query(0, 10));
// res.push(st.query(0, 9));
// res.push(st.query(0, 8));
// res.push(st.query(0, 7));
// res.push(st.query(3, 6));
// res.push(st.query(3, 5));
// res.push(st.query(3, 4));

// console.log("--- res --- \n", res.join("\n"));
