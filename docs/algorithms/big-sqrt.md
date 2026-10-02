# bigSqrt

[ソース: big-sqrt.ts](../../algorithms/big-sqrt.ts) · [アルゴリズム一覧](../algorithms.md)

bigintの整数平方根、floor(√value)を返します。

## API

bigSqrt(value: bigint): bigint

## 計算量

Newton法。反復回数は対数的。

## 例

```ts
bigSqrt(100n); // 10n
```

## 注意点

非負値を渡してください。

