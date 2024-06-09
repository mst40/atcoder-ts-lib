// min
class PriorityQueue {
  ary: number[];
  size: number;
  func: (a: number, b: number) => boolean;
  constructor(func: "min" | "max") {
    this.ary = [];
    this.size = 0;
    if (func == "min") {
      this.func = (a: number, b: number): boolean => {
        return a <= b;
      };
    } else {
      this.func = (a: number, b: number): boolean => {
        return a >= b;
      };
    }
  }

  push(v: number) {
    let ary: number[] = this.ary;
    let i: number = ary.length++;
    let mid: number = 0;

    while (i) {
      mid = (i - 1) >> 1;
      if (this.func(ary[mid], v)) break;
      ary[i] = ary[mid];
      i = mid;
    }
    this.size++;
    ary[i] = v;
  }

  pop(): number | undefined {
    if (this.size < 1) {
      return undefined;
    }
    this.size--;
    let ary: number[] = this.ary;
    let top: number = ary[0];
    let popped: number = ary.pop()!;

    let i: number = 0;
    let k: number = ary.length >> 1;
    let mid: number = 0;

    while (i < k) {
      mid = i * 2 + 1;
      if (ary[mid + 1] < ary[mid]) mid++;
      if (this.func(popped, ary[mid])) break;
      ary[i] = ary[mid];
      i = mid;
    }

    if (ary.length) ary[i] = popped;
    return top;
  }

  get getSize(): number {
    return this.size;
  }

  top(): number {
    return this.ary[0];
  }
}
