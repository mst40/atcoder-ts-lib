# upperBound

[ソース: upper-bound.ts](../../algorithms/upper-bound.ts) · [アルゴリズム一覧](../algorithms.md)

昇順配列でtargetより大きい最初の位置を返します。

## API

upperBound(sortedArray: number[], target: number): number

## 計算量

O(log n)。

## 例

```ts
upperBound([1, 2, 2, 4], 2); // 3
```

## 注意点

見つからない場合は配列長を返します。入力配列は昇順である必要があります。

