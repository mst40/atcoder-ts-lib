class Permutation<T> {
  private ary: T[];
  constructor(ary: T[]) {
    this.ary = ary.sort();
  }

  nextPermutation(ary: T[]) {
    let i = ary.length - 2;
    while (i >= 0 && ary[i] >= ary[i + 1]) {
      i--;
    }
    if (i < 0) return false;

    let j = ary.length - 1;
    while (ary[j] <= ary[i]) {
      j--;
    }
    [ary[i], ary[j]] = [ary[j], ary[i]];

    let left = i + 1;
    let right = ary.length - 1;
    while (left < right) {
      [ary[left], ary[right]] = [ary[right], ary[left]];
      left++;
      right--;
    }

    return true;
  }

  allPerms(): T[][] {
    const res: T[][] = [];
    do res.push([...this.ary]);
    while (this.nextPermutation(this.ary));
    return res;
  }
}
