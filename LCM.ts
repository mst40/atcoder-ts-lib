//gcd
function f(x: number, y: number): number {
    return y ? GCD(y, x % y) : x
}

function LCM(x: number, y: number): number {
    return (x * y) / f(x, y)
}