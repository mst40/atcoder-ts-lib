import test from "node:test";
import { assert, loadLibrary } from "../helpers";
test("matches prefixes and words and removes a word", () => {
  const { TrieTree } = loadLibrary<{ TrieTree: new () => any }>("trie-tree.ts", ["TrieTree"]);
  const trie = new TrieTree(); trie.insert("cat"); trie.insert("car");
  assert.equal(trie.hasExactMatch("cat"), true); assert.equal(trie.hasPrefixMatch("ca"), true); assert.equal(trie.getMatchNum("cab"), 2);
  assert.equal(trie.delete("cat"), true); assert.equal(trie.hasExactMatch("cat"), false); assert.equal(trie.hasExactMatch("car"), true);
});
