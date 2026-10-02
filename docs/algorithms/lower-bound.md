# lowerBound

[ソース: lower-bound.ts](../../algorithms/lower-bound.ts) · [アルゴリズム一覧](../algorithms.md)

昇順配列でtarget以上となる最初の位置を返します。

## API

lowerBound(sortedArray: number[], target: number): number

## 計算量

O(log n)。

## 例

```ts
lowerBound([1, 2, 2, 4], 2); // 1
```

## 注意点

見つからない場合は配列長を返します。入力配列は昇順である必要があります。

