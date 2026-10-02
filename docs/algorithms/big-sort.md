# bigSort

[ソース: big-sort.ts](../../algorithms/big-sort.ts) · [アルゴリズム一覧](../algorithms.md)

bigint配列を比較関数に従って新しい配列へソートします。

## API

bigSort(arr: bigint[], comparator: (a, b) => boolean): bigint[]

## 計算量

O(n log n)。

## 例

```ts
bigSort([3n, 1n], (a, b) => a < b);
```

## 注意点

元配列は変更しません。昇順ならa < b、降順ならa > bを渡します。

