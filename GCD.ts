function GCD(x: number, y: number): number {
    return y ? GCD(y, x % y) : x
}