# nCrMOD

[ソース: ncr-mod.ts](../../algorithms/ncr-mod.ts) · [アルゴリズム一覧](../algorithms.md)

bigint引数を使う二項係数関数です。

## API

nCrMOD(n: bigint, r: bigint, mod: bigint): bigint

## 計算量

呼出しごとにO(n)時間・メモリ。

## 例

```ts
nCrMOD(5n, 2n, 101n);
```

## 注意点

呼び出しのたびに階乗・逆元を作り直します。逆元を使うので通常は素数法で、nが法未満の範囲を想定します。

