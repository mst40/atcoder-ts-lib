# CumulativeSum2D

[ソース: cumulativeSum2D.ts](../../data-structures/cumulativeSum2D.ts) · [データ構造一覧](../data-structures.md)

2次元配列の累積和を構築し、矩形和を定数時間で返します。

## API

new CumulativeSum2D(grid)
- getRangeSum(y1, x1, y2, x2): 端点を含む矩形和

## 計算量

構築 O(hw)、query O(1)。

## 例

```ts
const cs = new CumulativeSum2D([[1, 2], [3, 4]]); cs.getRangeSum(0, 1, 1, 1); // 6
```

## 注意点

座標は0始まりで両端を含みます。範囲外の終了座標は配列末尾へ丸められます。

