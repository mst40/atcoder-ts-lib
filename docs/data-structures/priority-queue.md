# PriorityQueue<T>

[ソース: priority-queue.ts](../../data-structures/priority-queue.ts) · [データ構造一覧](../data-structures.md)

二分ヒープによる優先度付きキューです。

## API

new PriorityQueue("asc" | "des")
- push(key, priority = Number(key))
- pop(), top(): [key, priority] | undefined
- isEmpty()

## 計算量

push/pop O(log n)、top O(1)。

## 例

```ts
const q = new PriorityQueue<number>("asc"); q.push(4); q.push(1); q.pop(); // [1, 1]
```

## 注意点

priorityはnumber。空キューのpopはundefinedですが、topは空で例外になるため事前にisEmpty()を確認します。

