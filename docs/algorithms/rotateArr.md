# rotate

[ソース: rotateArr.ts](../../algorithms/rotateArr.ts) · [アルゴリズム一覧](../algorithms.md)

文字列の2次元配列を時計回りに90度回転します。

## API

rotate(grid: string[][]): string[][]

## 計算量

O(hw)。

## 例

```ts
rotate([["a", "b"], ["c", "d"]]);
```

## 注意点

現実装は正方形行列を前提とし、長方形では正しい出力寸法になりません。

