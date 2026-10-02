# lcm

[ソース: lcm.ts](../../algorithms/lcm.ts) · [アルゴリズム一覧](../algorithms.md)

最大公約数を使って最小公倍数を求めます。

## API

lcm(x: number, y: number): number

## 計算量

O(log min(x, y))。

## 例

```ts
lcm(12, 18); // 36
```

## 注意点

lcm.ts単体では動きません。gcd.tsのgcdを同じスコープに含めてください。numberの精度にも注意してください。

