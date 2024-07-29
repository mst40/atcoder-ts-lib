class CumulativeSum {
  cum: number[];
  constructor(arr: number[]) {
    this.cum = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      this.cum.push(arr[i] + this.cum[i - 1]);
    }
  }
  rangeSum(s: number, e: number) {
    console.log(this.cum);
    return this.cum[e] - (this.cum[s - 1] || 0);
  }
  sum(v: number) {
    return this.cum[v];
  }
}