# Mod

[ソース: mod.ts](../../algorithms/mod.ts) · [アルゴリズム一覧](../algorithms.md)

bigintの法を指定する剰余演算クラスです。ファイル内のmodオブジェクトは法10^9+7固定です。

## API

Mod(mod).mul(a,b), pow(a,n), inv(a), div(p,q), nPr(x,r), fac(x)
- modオブジェクトはmul, pow, inv, divを提供します。

## 計算量

pow O(log n)、その他は実装依存の反復回数。

## 例

```ts
const m = new Mod(11n); m.pow(3n, 4n);
```

## 注意点

inv/divはFermatの小定理を使うため、素数法かつ法と互いに素な値が必要です。指数は非負を想定します。

