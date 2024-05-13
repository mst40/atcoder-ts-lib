class TrieNode {
  private children: { [key: string]: TrieNode };
  private isEnd: boolean;

  constructor() {
    this.children = {};
    this.isEnd = false;
  }

  has(s: string): boolean {
    return s in this.children;
  }

  remove(s: string): void {
    delete this.children[s];
  }

  get getChild() {
    return this.children;
  }

  get getIsEnd(): boolean {
    return this.isEnd;
  }

  SetIsEnd(v: boolean) {
    this.isEnd = v;
  }
}

class TrieTree {
  private root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  public insert(str: string) {
    let node = this.root;
    for (const s of str) {
      if (!node.has(s)) {
        node.getChild[s] = new TrieNode();
      }

      node = node.getChild[s];
    }
    node.SetIsEnd(true);
  }

  public hasExactMatch(str: string): boolean {
    let node = this.root;
    for (const s of str) {
      if (!node.has(s)) {
        return false;
      }
      node = node.getChild[s];
    }
    return node.getIsEnd;
  }

  public hasPrefixMatch(str: string): boolean {
    let node = this.root;
    for (const s of str) {
      if (!node.has(s)) {
        return false;
      }
      node = node.getChild[s];
    }
    return true;
  }

  public delete(str: string): boolean {
    return this._deleteHelper(this.root, str, 0);
  }

  private _deleteHelper(node: TrieNode, str: string, idx: number): boolean {
    if (idx >= str.length || !node) {
      return false;
    }

    const t = str[idx];
    const child = node.getChild[t];

    if (idx === str.length - 1) {
      if (child) {
        child.SetIsEnd(false);
        return true;
      }
      return false;
    }

    const deleted = this._deleteHelper(child!, str, idx + 1);

    if (deleted && this.isEmptyObject(child!.getChild)) {
      delete node.getChild[t];
    }

    return deleted;
  }

  private isEmptyObject(obj: { [key: string]: TrieNode }): boolean {
    if (Object.keys(obj).length) {
      return false;
    }
    return true;
  }
}

// const tt = new TrieTree();
// tt.insert("abcdfeaf");
// tt.insert("abcdffaefa");
// console.log(tt.hasExactMatch("ab"));
// console.log(tt.hasPrefixMatch("a"));
// tt.insert("ac");
// tt.delete("abcdfeaf");
// console.log(tt.delete("a"));
// console.log(tt.hasExactMatch("ab"));
// console.log(tt.hasExactMatch("abcdffaefa"));
// console.log(tt.hasPrefixMatch("a"));

/**    
 * 
 *  _deleteHelper(): TrieTreeから単語を削除
 * 
 *  削除対象の単語と完全に一致するものが存在していない場合
 *      if (idx >= str.length || !node) {
      return false;
    }

    const t = str[idx];
    const child = node.getChild[t];

    末尾に到達したとき、isEndをfalseにして存在を消す。
    if (idx === str.length - 1) {
      if (child) {
        child.SetIsEnd(false);
        return true;
      }
      return false;
    }

    const deleted = this._deleteHelper(child!, str, idx + 1);

    単語が存在してた、かつ、その単語を先頭から一致する部分文字列とした他の単語が存在しない場合
    現在のnodeの子ノード t を削除する
    if (deleted && this.isEmptyObject(child!.getChild)) {
      delete node.getChild[t];
    }

    return deleted;
  }

 *  単語が存在しない場合
 * 
*/
