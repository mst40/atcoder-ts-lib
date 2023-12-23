function UpperBound(sortedArray: number[], target: number): number {
    let low: number = 0;
    let high: number = sortedArray.length - 1
    let mid: number = 0
    let res = 0
    while (low <= high) {
        mid = Math.floor((low + high) / 2)
        if (sortedArray[mid] < target) { low = mid + 1; }
        else if (sortedArray[mid] > target) { high = mid - 1 }
        else {
            res = mid + 1
            break
        }
    }
    if (res === 0) { res = low }
    return res
}
