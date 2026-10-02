# TreeMultiSet<T>

[ソース: tree-multi-set.ts](../../data-structures/tree-multi-set.ts) · [データ構造一覧](../data-structures.md)

AVL木ベースで値を重複個数付きで保持します。

## API

insert(value), remove(value), count(value)
- min(), max(), lower_bound(value), upper_bound(value)
- prev(value), next(value)

## 計算量

操作 O(log n)。

## 例

```ts
const ms = new TreeMultiSet<number>(); ms.insert(2); ms.insert(2); ms.count(2); // 2
```

## 注意点

lower_boundは以上の最小値、upper_boundはより大きい最小値です。removeの戻り値は削除成功判定にならないためcountで確認します。

