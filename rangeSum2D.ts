const rangeSum2D = (grid: number[][], top: number, bot: number, l: number, r: number): number => {
  if (top < 0 || grid.length < bot || l < 0 || grid[0].length < r) return 0;
  let sum: number = 0;
  for (let i = top; i < bot; i++) {
    for (let j = l; j < r; j++) {
      sum += grid[i][j];
    }
  }
  return sum;
};
