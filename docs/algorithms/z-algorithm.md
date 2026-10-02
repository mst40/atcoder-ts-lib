# z_algorithm

[ソース: z-algorithm.ts](../../algorithms/z-algorithm.ts) · [アルゴリズム一覧](../algorithms.md)

各接尾辞と文字列先頭の最長一致長を計算します。

## API

z_algorithm(s: string): number[]

## 計算量

O(n)時間・O(n)メモリ。

## 例

```ts
z_algorithm("aaaa"); // [4, 3, 2, 1]
```

## 注意点

z[i]はs[i..]とs[0..]の一致長です。非空文字列ではz[0] = s.lengthです。

