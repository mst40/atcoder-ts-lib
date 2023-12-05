function GCD(x: number, y: number): number {
    return y ? GCD(y, x % y) : x
}

//以下のgcdは(1,0)のようにyが0のとき、1%0をするとNaNとなり、0を返してしまうので使用しないほうが良い。
// function gcd(x, y) {
//     if (x % y) { return gcd(y, x % y) }
//     return y
// }