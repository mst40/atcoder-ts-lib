const DIRECTION_VECTORS = { L: [0, -1], R: [0, 1], U: [-1, 0], D: [1, 0] };
function moveLRUD(grid: string[], dir: string, i: number, j: number): [number, number] {
  const [di, dj] = DIRECTION_VECTORS[dir as "L" | "R" | "U" | "D"];
  const [ni, nj] = [di + i, dj + j];
  const [h, w]: number[] = [grid.length, grid[0].length];
  let res: [number, number] = [i, j];
  if (0 <= ni && ni < h && 0 <= nj && nj < w) res = [ni, nj];
  return res;
}

// Note: In this function, the top-left cell of the grid is treated as (1,1), not (0,0).
