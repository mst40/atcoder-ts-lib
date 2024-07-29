const DIRECTION_VECTORS = { L: [0, -1], R: [0, 1], U: [-1, 0], D: [1, 0] };
function moveLRUD(grid: string[], dir: string, i: number, j: number): [number, number] {
  const [di, dj] = DIRECTION_VECTORS[dir as "L" | "R" | "U" | "D"];
  const [ni, nj] = [di + i - 1, dj + j - 1];
  console.log(i, j, di, dj, ni, nj);
  const hight: number = grid.length;
  const width: number = grid[0].length;
  let res: [number, number] = [i, j];
  if (0 <= ni && ni < hight && 0 <= nj && nj < width && grid[ni][nj] !== "#") res = [ni + 1, nj + 1];
  return res;
}

// Note: In this function, the top-left cell of the grid is treated as (1,1), not (0,0).
