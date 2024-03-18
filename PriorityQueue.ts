class PriorityQueue {
  ary: number[];
  constructor() {
    this.ary = [];
  }

  push(v: number) {
    let ary = this.ary;
    let i = ary.length++;
    let j;

    while (i) {
      j = (i - 1) >> 1;
      if (ary[j] <= v) break;
      ary[i] = ary[j];
      i = j;
    }

    ary[i] = v;
  }

  pop() {
    let ary = this.ary;
    let top = ary[0];
    let popped = ary.pop()!;

    let i = 0;
    let mid = ary.length >> 1;
    let j;

    while (i < mid) {
      j = i * 2 + 1;
      if (ary[j + 1] < ary[j]) j++;
      if (popped <= ary[j]) break;
      ary[i] = ary[j];
      i = j;
    }

    if (ary.length) ary[i] = popped;
    return top;
  }

  size() {
    return this.ary.length;
  }

  top() {
    return this.ary[0];
  }
}
