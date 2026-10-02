# TrieTree

[ソース: trie-tree.ts](../../data-structures/trie-tree.ts) · [データ構造一覧](../data-structures.md)

文字列をtrieに登録し、完全一致・prefixを検索します。

## API

insert(s), hasExactMatch(s), hasPrefixMatch(s)
- getMatchNum(s): 既存経路との共通prefix長
- delete(s): boolean

## 計算量

文字列長Lに対し O(L)。

## 例

```ts
const trie = new TrieTree(); trie.insert("cat"); trie.hasPrefixMatch("ca"); // true
```

## 注意点

deleteは終端フラグを確認せず、登録されていないprefixでもtrueを返すことがあります。戻り値だけで登録有無を判断できません。

