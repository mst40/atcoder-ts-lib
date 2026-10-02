function rotate(ary: string[][]) {
  const res: string[][] = [...new Array(ary.length)].map(() => new Array(ary[0].length).fill(""));
  for (let y = 0; y < ary.length; y++) {
    for (let x = 0; x < ary[0].length; x++) {
      res[x][ary[0].length - 1 - y] = ary[y][x];
    }
  }
  return res;
}
