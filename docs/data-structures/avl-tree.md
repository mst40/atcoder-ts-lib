# AVL_Tree<T>

[ソース: avl-tree.ts](../../data-structures/avl-tree.ts) · [データ構造一覧](../data-structures.md)

比較可能な値を重複なしで保持するAVL平衡二分探索木です。

## API

new AVL_Tree<T>()
- insert(value), remove(value)
- min(), max(): T | undefined
- prev(value), next(value): T | undefined（厳密な前後値）

## 計算量

通常 O(log n)。

## 例

```ts
const tree = new AVL_Tree<number>(); tree.insert(4); tree.insert(2); tree.next(2); // 4
```

## 注意点

removeの真偽値は削除成功を表しません。値がなくても木が非空ならtrue、最後の要素を削除するとfalseになります。

