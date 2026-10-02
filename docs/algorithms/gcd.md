# gcd

[ソース: gcd.ts](../../algorithms/gcd.ts) · [アルゴリズム一覧](../algorithms.md)

ユークリッドの互除法で最大公約数を計算します。

## API

gcd(x: number, y: number): number

## 計算量

O(log min(x, y))。

## 例

```ts
gcd(48, 18); // 6
```

## 注意点

整数を想定します。負数の結果は正規化されません。

