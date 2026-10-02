/**
 * func arg
 * asc: (a,b) => a < b
 * dec: (a,b) => a > b
 */

function bigSort(arr: bigint[], func: (a: bigint, b: bigint) => boolean) {
  return [...arr].sort((a, b) => (func(a, b) ? -1 : a === b ? 0 : 1));
}
