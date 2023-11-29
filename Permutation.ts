function nextPermutation<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    const len: number = arr.length

    if (len < size) { return [] }

    if (size === 1) {
        for (let i = 0; i < len; i++) {
            res.push([arr[i]])
        }
    } else {
        for (let i = 0; i < len; i++) {
            let remain = [...arr]
            remain.splice(i, 1)

            let perms = nextPermutation(remain, size - 1)
            for (const p of perms) {
                res.push([arr[i], ...p])
            }
        }
    }
    return res
}