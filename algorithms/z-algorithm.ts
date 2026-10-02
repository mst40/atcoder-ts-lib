/**
 *
 * @param s:string
 * @returns res:number[]
 * 
 * 文字列 s　を受け取って同じ長さの配列を返す
 * res[i]はs[i]からx文字がsの接頭辞x文字と一致するかを表す
 * s[0,x) === s[i,x)
 */

function z_algorithm(s: string): number[] {
  const res: number[] = new Array(s.length).fill(0);
  res[0] = s.length;
  let i = 1;
  let j = 0;
  while (i < s.length) {
    while (i + j < s.length && s[j] == s[i + j]) j++;
    res[i] = j;
    if (j == 0) {
      i++;
      continue;
    }
    let k = 1;
    while (i + k < s.length && k + res[k] < j) {
      res[i + k] = res[k];
      k++;
    }
    i += k;
    j -= k;
  }
  return res;
}
