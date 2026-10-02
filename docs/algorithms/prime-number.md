# prime-number

[ソース: prime-number.ts](../../algorithms/prime-number.ts) · [アルゴリズム一覧](../algorithms.md)

素数篩と、異なる素因数の列挙を提供します。

## API

sieveOfEratosthenes(N): number[] — N以下の素数。
- primeFactorize(v): number[] — vの異なる素因数。

## 計算量

篩 O(N log log N)、因数分解 O(√v)。

## 例

```ts
sieveOfEratosthenes(10); primeFactorize(60); // [2, 3, 5]
```

## 注意点

primeFactorizeは素因数の指数を返しません。Nは非負整数、vは正整数を想定します。

