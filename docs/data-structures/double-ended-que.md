# DoubleEndedQue

[ソース: double-ended-que.ts](../../data-structures/double-ended-que.ts) · [データ構造一覧](../data-structures.md)

number[]を保持する簡易キューです。

## API

push_front(value), push_back(value), pop(): number[] | undefined, isEmpty()

## 計算量

push/pop 償却 O(1)。

## 例

```ts
const q = new DoubleEndedQue(); q.push_back([1]); q.pop();
```

## 注意点

front側は配列末尾から取り出すLIFO、back側は追加順のFIFOです。一般的な両端キューとは挙動が異なります。消費済みback配列を詰めません。

