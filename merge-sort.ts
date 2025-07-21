function mergeSort<T extends number | bigint>(arr: T[]): T[] {
  if (arr.length == 1) return arr;
  const mid: number = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const res: T[] = [];
  let i: number = 0;
  let j: number = 0;
  while (i < left.length || j < right.length) {
    res.push((left[i] || Infinity) <= (right[j] || Infinity) ? left[i++] : right[j++]);
  }
  return res;
}

//O(N logN)
