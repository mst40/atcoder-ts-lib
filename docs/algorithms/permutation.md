# Permutation

[ソース: permutation.ts](../../algorithms/permutation.ts) · [アルゴリズム一覧](../algorithms.md)

全順列を列挙するクラスと、次の順列へ進む関数です。

## API

Permutation(arr).allPerms(): T[][]
- nextPermutation(numberArray): boolean — 配列をその場で更新します。

## 計算量

次順列1回 O(n)。全列挙は出力サイズ相当。

## 例

```ts
const p = new Permutation([1, 2, 3]); p.allPerms();
```

## 注意点

Permutationのコンストラクタはsort()で入力配列を破壊的に並べ替えます。既定sortは文字列順で、重複順列の一意化もしません。

