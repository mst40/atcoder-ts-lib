//gcd
// function gcd(x: number, y: number): number {
//   return y ? gcd(y, x % y) : x;
// }

function lcm(x: number, y: number): number {
  return (x * y) / gcd(x, y);
}
