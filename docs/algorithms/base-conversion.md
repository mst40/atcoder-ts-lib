# baseConversion

[ソース: base-conversion.ts](../../algorithms/base-conversion.ts) · [アルゴリズム一覧](../algorithms.md)

数値を指定基数の文字列へ変換する関数です。

## API

baseConversion(value: number, base: number): string

## 計算量

O(log_base value)。

## 例

```ts
baseConversion(13, 2);
```

## 注意点

剰余を下位桁から連結するため、13の2進変換結果は通常の1101ではなく1011です。0は空文字列になります。非負整数と2以上の基数を前提とし、負数・基数の検査はありません。

