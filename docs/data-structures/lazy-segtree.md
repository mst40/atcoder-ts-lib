# LazySegTree

[ソース: lazy-segtree.ts](../../data-structures/lazy-segtree.ts) · [データ構造一覧](../data-structures.md)

sum/max/min/mul/gcdのいずれかで要素を集約し、区間への一括代入を遅延評価するセグメント木です。

## API

`new LazySegTree(values, op)` で構築します。`op` は `"sum" | "max" | "min" | "mul" | "gcd"`。

- `update(l, r, value)`: 半開区間 `[l, r)` の各要素を `value` に代入
- `get(i)`: 位置 `i` の値を取得
- `query(l, r)`: 半開区間 `[l, r)` の集約値を取得

## 計算量

構築は O(n log n)、各操作は O(log n) です。

## 例

```ts
const st = new LazySegTree([2, 1, 5, 3], "max");
st.update(1, 3, 4);
st.query(0, 4); // 4
st.get(2); // 4
```

## 注意点

入力配列は空でない前提です。現在の実装は各ノードに代入値をそのまま格納するため、区間長を考慮すべき `sum` や、代入と集約の整合が必要な `mul` では区間更新後に正しい集約値を得られない場合があります。`get` は対象位置まで遅延値を伝播せず、保留中の更新があると古い値を返す場合があります。区間更新後は `query(i, i + 1)` で値を確認してください。
