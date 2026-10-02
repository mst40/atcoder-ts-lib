function upperBound(sortedArray: number[], target: number): number {
    let low: number = 0;
    let high: number = sortedArray.length - 1;
    let mid: number = 0;
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      if (sortedArray[mid] <= target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return low;
  }