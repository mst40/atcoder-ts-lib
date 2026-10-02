# ModInt

[ソース: mod-int.ts](../../algorithms/mod-int.ts) · [アルゴリズム一覧](../algorithms.md)

number型の剰余演算クラスです。

## API

ModInt(mod).mul(a,b), pow(a,n), inv(a), div(p,q), nPr(x,r), fac(x)

## 計算量

pow O(log n)、fac/nPr O(n)。

## 例

```ts
const m = new ModInt(101); m.pow(3, 4);
```

## 注意点

逆元は素数法を前提とします。mulはビット演算で積を分割するため扱える値・法に制約があります。

