// add v to (s <= xi,xi+1... < t)
class Imos {
  ary: number[];
  constructor(len: number) {
    this.ary = new Array(len + 1).fill(0);
  }
  add(s: number, t: number, v: number) {
    this.ary[s] += v;
    this.ary[t] -= v;
  }
  sum(): number[] {
    let res = new Array(this.ary.length - 1);
    for (let i = 1; i < this.ary.length; i++) res[i - 1] += this.ary[i];
    return res;
  }
}
