# DoublyLinkedList

[ソース: doubly-linked-list.ts](../../data-structures/doubly-linked-list.ts) · [データ構造一覧](../data-structures.md)

head/tailを持つnumber値の双方向連結リストです。

## API

new DoublyLinkedList(initialValue)
- addHead(value), addTail(value)
- addAtIndex(index, value), delete(index)
- printList()

## 計算量

index走査は O(n) です。head/tailのリンク更新自体は O(1) ですが、成功した変更操作は全要素を `printList()` するため、実際の呼び出し全体は O(n) です。

## 例

```ts
const list = new DoublyLinkedList(2); list.addHead(1); list.addTail(3);
```

## 注意点

初期値必須で空リストから開始できません。addAtIndexは既存範囲indexのみ受付けます。変更操作はconsole.logします。
