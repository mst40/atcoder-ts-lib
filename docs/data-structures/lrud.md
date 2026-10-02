# moveLRUD

[ソース: lrud.ts](../../data-structures/lrud.ts) · [データ構造一覧](../data-structures.md)

グリッド上で上下左右1マス移動した座標を返します。

## API

moveLRUD(grid, dir, i, j): [number, number]

## 計算量

O(1)。

## 例

```ts
moveLRUD(["...", "..."], "R", 0, 0); // [0, 1]
```

## 注意点

dirはL/R/U/D、座標は0始まりです。範囲外への移動は元の座標を返します。空でない長方形gridを前提とします。

