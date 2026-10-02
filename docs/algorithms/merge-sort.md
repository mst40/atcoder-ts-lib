# mergeSort

[ソース: merge-sort.ts](../../algorithms/merge-sort.ts) · [アルゴリズム一覧](../algorithms.md)

numberまたはbigint配列を昇順ソートします。

## API

mergeSort<T extends number | bigint>(arr: T[]): T[]

## 計算量

O(n log n)。

## 例

```ts
mergeSort([4, 1, 3]); // [1, 3, 4]
```

## 注意点

現実装は空配列を扱えず、値0を偽値としてInfinityとみなすため0を含む入力も壊れます。

