/**
 * @class FenwickTree
 *
 * add: iをvalに置き換える O(logN)
 * sum: 0からiまでの区間和を求める O(logN)
 *
 * 区間に対して加算を行いたい場合、imos法のように更新する
 * FenwicckTree.add(s,v)
 * FenwicckTree.add(t,-v)
 *
 */
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
