class PriorityQueue<T> {
  heap: [T, number][];
  order: number;
  constructor(order: "asc" | "des") {
    this.heap = [];
    this.order = order == "asc" ? 1 : -1;
  }

  push(key: T, value: number = Number(key)) {
    value *= this.order;
    const Q = this.heap;
    Q.push([key, value]);
    for (let i = Q.length - 1, p; i > 0; i = p) {
      p = (i - 1) >> 1;
      if (Q[p][1] < value) break;
      Q[i] = Q[p];
      Q[p] = [key, value];
    }
  }

  pop(): [T, number] | undefined {
    const Q = this.heap;
    const res = Q[0];
    const tail: [T, number] = Q.pop()!;
    const len = Q.length;
    const f = (n: number) => (n << 1) + 1;
    if (len) Q[0] = tail;
    for (let i = 0, t; f(i) < len; i = t) {
      t = f(i);
      if (t < len - 1 && Q[t][1] > Q[t + 1][1]) t++;
      if (Q[t][1] > Q[i][1]) break;
      const tmp = Q[i];
      Q[i] = Q[t];
      Q[t] = tmp;
    }
    if (res) res[1] *= this.order;
    return res;
  }

  top(): [T, number] | undefined {
    const Q = this.heap;
    const res: [T, number] = [...Q[0]];
    if (res) res[1] *= this.order;
    return res;
  }

  isEmpty() {
    return this.heap.length ? false : true;
  }
}

/**
 *
 * push(): heaptreeを用いて以下を行う。
 *  1.木の末尾に新しい値を追加する
 *  2.末尾から各i と i の親ノード((i-1)>>1)を比較し、必要な場合入れ替えシフトアップしながら適切な場所に移動する
 *
 * pop(): heaptreeを用いて以下を行う。
 *  1.木の一番上(index:0)をresultとする
 *  2.木の一番上を木の末尾と置き換える。
 *  3.iと iの左の子ノード((i<<1)+1)のノードを比較し、必要な場合入れ替え、シフトダウンしながら適切な場所に移動する
 *
 */
