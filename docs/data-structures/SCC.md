# SCC

[ソース: SCC.ts](../../data-structures/SCC.ts) · [データ構造一覧](../data-structures.md)

有向グラフを強連結成分に分解し、各成分を1頂点にまとめた縮約DAGを構築します。Kosaraju法を使います。

## API

- `new SCC(n)`: 頂点 `0..n-1` のグラフを作成
- `addEdge(u, v)`: 有向辺 `u → v` を追加
- `solve()`: 強連結成分分解と縮約DAGを構築
- `scc`: 各成分に属する頂点の配列
- `cmp`: `cmp[v]` は頂点 `v` が属する成分の番号
- `dag`: 成分番号を頂点とした縮約グラフの隣接リスト

## 計算量

`solve()` は O(V + E) 時間、O(V + E) 空間です。

## 例

```ts
const graph = new SCC(3);
graph.addEdge(0, 1);
graph.addEdge(1, 0);
graph.addEdge(1, 2);
graph.solve();
// scc: [[2], [0, 1]]
// cmp: [1, 1, 0]
// dag: [[], [0]]
```

## 注意点

頂点番号は0始まりです。`solve()` の後、成分番号はトポロジカル順の逆順になり、縮約グラフの辺は大きい番号から小さい番号へ向かいます。`dag` では同じ成分間の辺と、同じ成分対を結ぶ重複辺は除かれます。
