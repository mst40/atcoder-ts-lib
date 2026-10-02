# CumulativeSum

[ソース: cumulative-sum.ts](../../data-structures/cumulative-sum.ts) · [データ構造一覧](../data-structures.md)

1次元配列のprefix sumを前計算します。

## API

new CumulativeSum(values)
- rangeSum(s, e): [s, e) の合計
- sum(i): [0, i] の累積和

## 計算量

構築 O(n)、query O(1)。

## 例

```ts
const cs = new CumulativeSum([2, 4, 6]); cs.rangeSum(1, 3); // 10
```

## 注意点

空配列を扱えません。sum(i)は半開区間ではなくiを含みます。

