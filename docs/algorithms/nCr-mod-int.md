# nCrModInt

[ソース: nCr-mod-int.ts](../../algorithms/nCr-mod-int.ts) · [アルゴリズム一覧](../algorithms.md)

二項係数をnumberで計算するため、階乗・逆元を前計算するクラスです。

## API

new nCrModInt(mod, max); nCr(n, r): number

## 計算量

前処理 O(max)、query O(1)。

## 例

```ts
const comb = new nCrModInt(101, 20); comb.nCr(5, 2);
```

## 注意点

nはmax未満にしてください。逆元計算のため通常は素数法で、対象階乗が法未満であることが必要です。

