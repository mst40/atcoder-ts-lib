# SegmentTree

[ソース: segtree.ts](../../data-structures/segtree.ts) · [データ構造一覧](../data-structures.md)

sum/max/min/mul/gcdの集約を扱うセグメント木です。

## API

`new SegmentTree(values, op)` で構築します。`op` は `"sum" | "max" | "min" | "mul" | "gcd"`。

- `update(i, value)`: 位置 `i` を一点更新
- `get(i)`: 位置 `i` の値を取得
- `query(l, r)`: 半開区間 `[l, r)` の集約値を取得

## 計算量

構築は O(n log n)、各操作は O(log n) です。

## 例

```ts
const st = new SegmentTree([2, 1, 5], "sum");
st.query(0, 2); // 3
st.update(1, 4);
st.get(1); // 4
```

## 注意点

入力配列は空でない前提です。範囲は0始まりの半開区間です。

