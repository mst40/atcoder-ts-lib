# UnionFind

[ソース: union-find.ts](../../data-structures/union-find.ts) · [データ構造一覧](../data-structures.md)

経路圧縮とunion by sizeを使う素集合データ構造です。

## API

new UnionFind(n): 頂点0..n-1
- unite(a, b): boolean
- isUnite(a, b), getParent(v), getSize(v)
- unionCnt: 成分数

## 計算量

操作あたり償却 O(α(n))。

## 例

```ts
const uf = new UnionFind(4); uf.unite(0, 1); uf.isUnite(0, 1); // true
```

## 注意点

頂点番号は0始まりです。uniteは異なる成分を結合したときだけtrueです。

