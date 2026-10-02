# bitwiseEnumeration

[ソース: bitwise-enumeration.ts](../../algorithms/bitwise-enumeration.ts) · [アルゴリズム一覧](../algorithms.md)

配列要素からビットマスクで部分集合を作る関数です。

## API

bitwiseEnumeration<T>(arr: T[]): T[][]

## 計算量

現実装 O(n²)。

## 例

```ts
bitwiseEnumeration(["a", "b"]);
```

## 注意点

全2^n個を列挙する意図に見えますが、現実装はmaskを0から2*n-1までしか走査しません。JavaScriptのビット演算は32bitです。

