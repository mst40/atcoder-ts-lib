class FenwickTree {
  tree: number[];
  size: number;
  constructor(size: number) {
    // use 1-index for simplicity. internalimplementation uses 0-index
    this.tree = new Array(size + 1).fill(0);
    this.size = size;
  }

  add(i: number, val: number) {
    i++;
    while (i <= this.size) {
      this.tree[i - 1] += val;
      // move next index
      // (i & -i) is the least significant bit of i
      i += i & -i;
    }
  }

  sum(i: number) {
    let res = 0;
    i++;
    while (i > 0) {
      res += this.tree[i - 1];
      // move previous index
      i -= i & -i;
    }
    return res;
  }
}

// const N = 10;
// const ft = new FenwickTree(N);
//
// function add(s: number, t: number, x: number) {
//   ft.add(s, x);
//   ft.add(t, -x);
// }
