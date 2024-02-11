//常に先頭が一番小さい

class priorityQueue {
  //queue:[data, node]
  queue: { data: number; node: number }[];
  //比較関数 最小(a,b)=>(a <= b) or 最大(a,b)=>(a >= b)
  compare: (a: number, b: number) => boolean;

  constructor(compare: () => boolean) {
    this.queue = [];
    this.compare = compare;
  }

  push(d: number, n: number) {
    const q = this.queue;
    let i = q.length;
    let mid = 0;
    while (i) {
      mid = (i - 1) >> 1;

      if (this.compare(q[mid].data, d)) {
        break;
      }

      q[i] = q[mid];
      i = mid;
    }
    q[i] = { data: d, node: n };
  }

  pop(): { data: number; node: number } | undefined {
    if (!this.queue) {
      return undefined;
    }

    const q = this.queue;
    const r = q[0];
    const popQ = q.pop()!;
    const k = q.length >> 1;

    let i = 0;
    let mid = 0;
    while (i < k) {
      mid = (i << 1) + 1;
      if (q[mid + 1] && q[mid + 1].data < q[mid].data) {
        mid++;
      }

      if (this.compare(popQ.data, q[mid].data)) {
        break;
      }

      q[i] = q[mid];
      i = mid;
    }

    if (q.length) {
      q[i] = popQ;
    }

    return r;
  }
  get size() {
    return this.queue.length;
  }
  get top() {
    return this.queue[0];
  }
}
