# Imos

[ソース: imos.ts](../../data-structures/imos.ts) · [データ構造一覧](../data-structures.md)

差分配列で半開区間への一括加算を記録します。

## API

new Imos(length)
- add(s, t, value): [s, t) に加算
- sum(): number[]

## 計算量

range add O(1)、復元 intended O(n)。

## 例

```ts
const imos = new Imos(5); imos.add(1, 4, 3);
```

## 注意点

現状のsum()は未初期化配列へ加算するため、返す要素がNaNになります。復元結果には使えません。

