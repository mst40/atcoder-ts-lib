function sieveOfEratosthenes<T>(num: number): number[] {
    let list = new Array(num + 1).fill(1)
    const res: number[] = []
    for (let i = 2; i <= num; i++) {
        if (list[i]) {
            res.push(i)
            for (let j = 2; j <= Math.floor(num / i); j++) { list[i * j] = 0 }
        }
    }
    return res
}