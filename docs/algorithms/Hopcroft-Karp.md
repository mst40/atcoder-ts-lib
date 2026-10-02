# Hopcroft-Karp

[ソース: Hopcroft-Karp.ts](../../algorithms/Hopcroft-Karp.ts) · [アルゴリズム一覧](../algorithms.md)

二部グラフの最大マッチングを求めます。左・右の頂点番号はそれぞれ0始まりです.

## API

HopcroftKarp(leftCount, rightCount) — 左右の頂点数で初期化します。
- addEdge(u, v) — 左頂点uと右頂点vを結びます。
- maxMatching(): number — 最大マッチング数を返します。
- getMatches(): [number, number][] — 対応した頂点ペアを返します。

## 計算量

O(E√V)。

## 例

```ts
const hk = new HopcroftKarp(2, 2); hk.addEdge(0, 0); hk.addEdge(1, 1); const size = hk.maxMatching();
```

## 注意点

maxMatchingを再度呼ぶと現在のマッチング状態から継続します。

