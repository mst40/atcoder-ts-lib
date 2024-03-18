class PriorityQueue {
  ary: number[];
  constructor() {
    this.ary = [];
  }

  push(v: number) {
    let ary: number[] = this.ary;
    let i: number = ary.length++;
    let mid: number = 0;

    while (i) {
      mid = (i - 1) >> 1;
      if (ary[mid] <= v) break;
      ary[i] = ary[mid];
      i = mid;
    }

    ary[i] = v;
  }

  pop(): number {
    let ary: number[] = this.ary;
    let top: number = ary[0];
    let popped: number = ary.pop()!;

    let i: number = 0;
    let k: number = ary.length >> 1;
    let mid: number = 0;

    while (i < k) {
      mid = i * 2 + 1;
      if (ary[mid + 1] < ary[mid]) mid++;
      if (popped <= ary[mid]) break;
      ary[i] = ary[mid];
      i = mid;
    }

    if (ary.length) ary[i] = popped;
    return top;
  }

  size(): number {
    return this.ary.length;
  }

  top(): number {
    return this.ary[0];
  }
}
