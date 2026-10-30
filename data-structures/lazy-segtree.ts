class LazySegTree<S, F> {
  private size: number;
  private log: number;
  private d: S[];
  private lz: F[];

  constructor(
    private op: (a: S, b: S) => S,
    private e: () => S,
    private mapping: (f: F, x: S) => S,
    private composition: (f: F, g: F) => F,
    private id: () => F,
    v: S[],
  ) {
    let size = 1;
    let log = 0;

    while (size < v.length) {
      size <<= 1;
      log++;
    }

    this.size = size;
    this.log = log;

    this.d = new Array(2 * size).fill(null).map(() => this.e());
    this.lz = new Array(size).fill(null).map(() => this.id());

    // 葉
    for (let i = 0; i < v.length; i++) {
      this.d[size + i] = v[i];
    }

    // 親
    for (let i = size - 1; i >= 1; i--) {
      this.update(i);
    }
  }

  private update(k: number): void {
    this.d[k] = this.op(this.d[2 * k], this.d[2 * k + 1]);
  }

  private allApply(k: number, f: F): void {
    this.d[k] = this.mapping(f, this.d[k]);

    if (k < this.size) {
      this.lz[k] = this.composition(f, this.lz[k]);
    }
  }

  private push(k: number): void {
    this.allApply(2 * k, this.lz[k]);
    this.allApply(2 * k + 1, this.lz[k]);
    this.lz[k] = this.id();
  }

  get(p: number): S {
    p += this.size;

    for (let i = this.log; i >= 1; i--) {
      this.push(p >> i);
    }

    return this.d[p];
  }

  set(p: number, x: S): void {
    p += this.size;

    for (let i = this.log; i >= 1; i--) {
      this.push(p >> i);
    }

    this.d[p] = x;

    for (let i = 1; i <= this.log; i++) {
      this.update(p >> i);
    }
  }

  prod(l: number, r: number): S {
    if (l === r) return this.e();

    l += this.size;
    r += this.size;

    for (let i = this.log; i >= 1; i--) {
      if ((l >> i) << i !== l) {
        this.push(l >> i);
      }

      if ((r >> i) << i !== r) {
        this.push((r - 1) >> i);
      }
    }

    let sml = this.e();
    let smr = this.e();

    while (l < r) {
      if (l & 1) {
        sml = this.op(sml, this.d[l++]);
      }

      if (r & 1) {
        smr = this.op(this.d[--r], smr);
      }

      l >>= 1;
      r >>= 1;
    }

    return this.op(sml, smr);
  }

  apply(l: number, r: number, f: F): void {
    if (l === r) return;

    l += this.size;
    r += this.size;

    for (let i = this.log; i >= 1; i--) {
      if ((l >> i) << i !== l) {
        this.push(l >> i);
      }

      if ((r >> i) << i !== r) {
        this.push((r - 1) >> i);
      }
    }

    const l2 = l;
    const r2 = r;

    while (l < r) {
      if (l & 1) {
        this.allApply(l++, f);
      }

      if (r & 1) {
        this.allApply(--r, f);
      }

      l >>= 1;
      r >>= 1;
    }

    for (let i = 1; i <= this.log; i++) {
      if ((l2 >> i) << i !== l2) {
        this.update(l2 >> i);
      }

      if ((r2 >> i) << i !== r2) {
        this.update((r2 - 1) >> i);
      }
    }
  }
}
