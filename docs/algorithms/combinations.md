# combinations

[ソース: combinations.ts](../../algorithms/combinations.ts) · [アルゴリズム一覧](../algorithms.md)

入力配列または整数区間から、指定個数を選ぶ組を生成します。

## API

combinations<T>(arr, size): T[][] — 入力順を保つ組を返します。
- combinations0toM(M, size): number[][] — [0, M) から選びます。

## 計算量

出力件数×組の長さに比例。

## 例

```ts
combinations([1, 2, 3], 2); // [[1,2], [1,3], [2,3]]
```

## 注意点

sizeは正の整数を想定します。combinations(arr, 0)は空の組を1つ返しません。

