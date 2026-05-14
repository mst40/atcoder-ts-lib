class CumulativeSum {
  cum: number[];
  constructor(arr: number[]) {
    this.cum = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      this.cum.push(arr[i] + this.cum[i - 1]);
    }
  }
  // [s,e) sliceと一緒
  rangeSum(s: number, e: number) {
    return this.cum[e - 1] - (this.cum[s - 1] || 0);
  }
  sum(v: number) {
    return this.cum[v];
  }
}
