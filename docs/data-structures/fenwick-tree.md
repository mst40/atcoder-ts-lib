# FenwickTree

[ソース: fenwick-tree.ts](../../data-structures/fenwick-tree.ts) · [データ構造一覧](../data-structures.md)

点加算とprefix sumを扱うFenwick treeです。

## API

new FenwickTree(size)
- add(i, delta): index iに加算
- sum(i): [0, i] の和

## 計算量

add/sum O(log n)。

## 例

```ts
const fw = new FenwickTree(4); fw.add(0, 2); fw.add(2, 5); fw.sum(2); // 7
```

## 注意点

indexは0始まり。addは値の置換でなく加算、sumはiを含むprefixです。

