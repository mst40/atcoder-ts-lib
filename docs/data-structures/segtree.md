# SegmentTree, LazySegTree

[ソース: segtree.ts](../../data-structures/segtree.ts) · [データ構造一覧](../data-structures.md)

sum/max/min/mul/gcdの集約を扱うセグメント木です。

## API

SegmentTree(values, op): update(i, value), get(i), query(l, r)
- LazySegTree(values, op): update(l, r, value), get(i), query(l, r)
- query/update範囲は半開区間 [l, r)

## 計算量

操作 O(log n)。

## 例

```ts
const st = new SegmentTree([2, 1, 5], "sum"); st.query(0, 2); // 3
```

## 注意点

入力は空でない前提です。LazySegTreeでsumの複数要素を一括代入すると、区間長を掛けないため合計が誤ります。遅延中のgetも古い値を読む可能性があります。

