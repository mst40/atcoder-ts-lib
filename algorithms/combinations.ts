// generate combinations from array
function combinations<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  const len: number = arr.length;
  if (len < size) {
    return [];
  }

  if (size === 1) {
    for (const a of arr) {
      res.push([a]);
    }
  } else {
    for (let i = 0; i < len; i++) {
      const remain = combinations(arr.slice(i + 1), size - 1);
      for (const c of remain) {
        res.push([arr[i], ...c]);
      }
    }
  }
  return res;
}

// generate combinations from number of 0 to M
function combinations0toM(M: number, size: number): number[][] {
  const res: number[][] = [];
  const que = [];
  for (let i = 0; i < M; i++) que.push([i]);
  for (let i = 0; i < que.length; i++) {
    const qi: number[] = que[i];
    const len = qi.length;
    if (len == size) {
      res.push(qi);
    } else {
      for (let j = qi[len - 1] + 1; j < M; j++) {
        que.push([...qi, j]);
      }
    }
  }
  return res;
}
