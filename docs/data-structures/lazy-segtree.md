# LazySegTree

[ソース: lazy-segtree.ts](../../data-structures/lazy-segtree.ts) · [データ構造一覧](../data-structures.md)

AtCoder Libraryの `lazy_segtree` に近い汎用遅延セグメント木です。区間の集約値 `S` と更新写像 `F` を利用者が定義します。

## API

`new LazySegTree(op, e, mapping, composition, id, values)` で構築します。

- `op(a, b)`: 2つの集約値を結合
- `e()`: `op` の単位元
- `mapping(f, x)`: 集約値 `x` に写像 `f` を適用
- `composition(f, g)`: 先に `g`、次に `f` を適用する合成写像を返す（`f ∘ g`）
- `id()`: 更新写像の恒等写像
- `values`: 初期配列。各要素は集約値 `S`

インスタンスは次の操作を提供します。範囲は0始まりの半開区間 `[l, r)` です。

- `get(p)`: 位置 `p` の集約値を取得
- `set(p, x)`: 位置 `p` を `x` に置き換え
- `prod(l, r)`: 区間の集約値を取得。空区間なら `e()` を返す
- `apply(l, r, f)`: 区間内の各要素に写像 `f` を適用

## 使用例

区間への加算と区間和を扱う例です。和と一緒に要素数を持つことで、区間全体への加算を集約値へ反映できます。

```ts
type S = { sum: number; size: number };
type F = number; // 加算量

const seg = new LazySegTree<S, F>(
  (a, b) => ({ sum: a.sum + b.sum, size: a.size + b.size }),
  () => ({ sum: 0, size: 0 }),
  (f, x) => ({ sum: x.sum + f * x.size, size: x.size }),
  (f, g) => f + g,
  () => 0,
  [1, 2, 3].map((sum) => ({ sum, size: 1 })),
);

seg.apply(0, 2, 10); // [11, 12, 3] に相当する
seg.prod(0, 3); // { sum: 25, size: 3 }
```

## 計算量

構築は O(n)、`get` / `set` / `prod` / `apply` は O(log n) です。

## 注意点

`op`、`e`、`mapping`、`composition`、`id` は、遅延セグメント木として整合するように定義してください。特に、`mapping(f, op(a, b))` が `op(mapping(f, a), mapping(f, b))` と一致し、`composition(f, g)` が `f` の後に `g` ではなく **`g` の後に `f`** を適用する写像になる必要があります。`values` が空でも構築でき、`prod(l, l)` は `e()` を返します。
