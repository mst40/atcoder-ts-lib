function combinations<T>(arr: T[], size: number): T[][] {
    const res: T[][] = []
    const len: number = arr.length
    if (len < size) { return []; }

    if (size === 1) { for (const a of arr) { res.push([a]) } }
    else {
        for (let i = 0; i < len; i++) {
            const remain = combinations(arr.slice(i + 1), size - 1)
            for (const c of remain) {
                res.push([arr[i], ...c])
            }
        }
    }
    return res
}