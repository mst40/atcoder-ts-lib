// lazy eval Segment Tree (minimum)
class SegTree {
  tree: number[];
  lazy: number[];
  leaf: number;
  INIT: number = Infinity; ///////////////////editable
  constructor(size: number) {
    this.tree = [];
    this.lazy = [];
    this.leaf = 1;
    this.init(size);
  }

  init(size: number) {
    let leafSize = 1;
    while (leafSize < size) {
      leafSize *= 2;
    }
    this.leaf = leafSize;
    this.tree = Array(2 * this.leaf - 1).fill(this.INIT);
    this.lazy = Array(2 * this.leaf - 1).fill(this.INIT);
  }

  // lazy eval
  eval(t: number): void {
    if (this.lazy[t] === this.INIT) {
      return;
    }
    // 子ノードに伝播
    if (t < this.leaf - 1) {
      this.lazy[t * 2 + 1] = this.lazy[t];
      this.lazy[t * 2 + 2] = this.lazy[t];
    }
    // 自身に反映＆初期化
    this.tree[t] = this.lazy[t];
    this.lazy[t] = this.INIT;
  }

  // update [a,b) to x
  update(a: number, b: number, x: number): void {
    this._updateHelper(a, b, x, 0, 0, this.leaf);
  }

  // the value of t
  get(t: number): number {
    t += this.leaf - 1;
    return this.tree[t];
  }

  // return the minimum element of [a,b)
  query(a: number, b: number): number {
    return this._queryHelper(a, b, 0, 0, this.leaf);
  }

  /* helper functions */
  private _min(a: number, b: number) {
    return a < b ? a : b;
  }
  private _updateHelper(a: number, b: number, x: number, t: number, l: number, r: number) {
    this.eval(t);
    if (a <= l && r <= b) {
      this.lazy[t] = x; ///////////////////editable
      this.eval(t);
    } else if (l < b && a < r) {
      this._updateHelper(a, b, x, t * 2 + 1, l, Math.floor((l + r) / 2));
      this._updateHelper(a, b, x, t * 2 + 2, Math.floor((l + r) / 2), r);
      this.tree[t] = this._min(this.tree[t * 2 + 1], this.tree[t * 2 + 2]); ///////////////////editable
    }
  }
  private _queryHelper(a: number, b: number, t: number, l: number, r: number): number {
    this.eval(t);
    if (b <= l || r <= a) {
      return this.INIT;
    } else if (a <= l && r <= b) {
      return this.tree[t];
    } else {
      const vl = this._queryHelper(a, b, t * 2 + 1, l, Math.floor((l + r) / 2));
      const vr = this._queryHelper(a, b, t * 2 + 2, Math.floor((l + r) / 2), r);
      return this._min(vl, vr); ///////////////////editable
    }
  }

  debug() {
    console.log("leaf", this.leaf);
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
