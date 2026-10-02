# rangeSum2D

[ソース: rangeSum2D.ts](../../algorithms/rangeSum2D.ts) · [アルゴリズム一覧](../algorithms.md)

2次元配列内の矩形領域を直接走査して合計します。

## API

rangeSum2D(grid, top, bot, left, right): number — 行[top, bot)、列[left, right)

## 計算量

O(矩形面積)。

## 例

```ts
rangeSum2D([[1, 2], [3, 4]], 0, 2, 0, 2); // 10
```

## 注意点

指定範囲の一部でも境界を越えると0を返し、範囲を切り詰めません。

