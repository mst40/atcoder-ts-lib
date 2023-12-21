function bitSubSetSearch<T>(arr: T[]): T[][] {
    const n = arr.length;
    let set: T[][] = [];

    for (let i = 0; i < 2 * n; i++) {
        const subset: T[] = [];

        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(arr[j]);
            }
        }

        set.push(subset)
    }
    return set;
}