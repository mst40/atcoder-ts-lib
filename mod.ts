class Mod {
  mod: bigint;
  constructor(mod: bigint) {
    this.mod = mod;
  }

  mul(a: bigint, b: bigint) {
    return (a * b) % this.mod;
  }

  // a ** n % mod
  pow(a: bigint, n: bigint): bigint {
    if (n === 0n) {
      return 1n;
    }

    if (n % 2n === 1n) {
      // odd
      return this.mul(a, this.pow(a, n - 1n));
    } else {
      // even
      return this.pow(this.mul(a, a), n / 2n);
    }
  }

  // a の逆元(inverse element)
  // a * inv(a) = 1
  //*1
  inv(a: bigint) {
    return this.pow(a, this.mod - 2n);
  }

  // p/q % mod
  // 逆元があるときのみ有効
  div(p: bigint, q: bigint) {
    return this.mul(p, this.inv(q));
  }
}

const mod = {
  mod: 10n ** 9n + 7n,
  mul(a: bigint, b: bigint) {
    return (a * b) % this.mod;
  },

  // a ** n % mod
  pow(a: bigint, n: bigint): bigint {
    if (n === 0n) {
      return 1n;
    }

    if (n % 2n === 1n) {
      // odd
      return this.mul(a, this.pow(a, n - 1n));
    } else {
      // even
      return this.pow(this.mul(a, a), n / 2n);
    }
  },

  // a の逆元(inverse element)
  // a * inv(a) = 1
  //*1
  inv(a: bigint) {
    return this.pow(a, this.mod - 2n);
  },

  // p/q % mod
  // 逆元があるときのみ有効
  div(p: bigint, q: bigint) {
    return this.mul(p, this.inv(q));
  },
};

/**
 * *1
 * b = a**(m-2)%m,   a*b%m = 1
 * フェルマーの小定理より
 * 　素数 pと、pの倍数でない整数 aにおいて
 *  a**(p-1)%p = 1
 * 　が成り立つ
 *  これは以下のように変形できる。
 *  a*a**(p-2)%p = 1
 * つまり、 a**(p-2)%p が a の逆元となる。
 *
 *
 *
 */
// class Mod {
//     mod: bigint;
//     constructor(mod: bigint) {
//       this.mod = mod;
//     }
//     mul(a: bigint, b: bigint):bigint {
//       return (a * b) % this.mod;
//     }
//     pow(a: bigint, n: bigint):bigint {
//       if (n === 0n) {
//         return 1n;
//       }
//       if (n % 2n === 1n) {
//         return this.mul(a, this.pow(a, n - 1n));
//       } else {
//         return this.pow(this.mul(a, a), n / 2n);
//       }
//     }
//     inv(a: bigint):bigint {
//       return this.pow(a, this.mod - 2n);
//     }
//     div(p: bigint, q: bigint):bigint {
//       return this.mul(p, this.inv(q));
//     }
//   }
