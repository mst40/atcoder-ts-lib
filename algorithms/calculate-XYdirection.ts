// calculate direction between (x1,y1) to (x2,y2)

function calXYdir(x1: number, y1: number, x2: number, y2: number) {
  const xx: number = Math.abs(x1 - x2);
  const yy: number = Math.abs(y1 - y2);
  return Math.sqrt(xx ** 2 + yy ** 2);
}
