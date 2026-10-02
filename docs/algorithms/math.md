# math

[ソース: math.ts](../../algorithms/math.ts) · [アルゴリズム一覧](../algorithms.md)

等差数列・等比数列の和を計算する関数群です。

## API

math.as(first, last, count) — 等差数列の和。
- math.sogp(first, ratio, count) — 等比数列の和。

## 計算量

O(1)。

## 例

```ts
math.as(1, 5, 3); // 9
```

## 注意点

sogpはratio=1でゼロ除算になるため、その場合はfirst * countを計算してください。

