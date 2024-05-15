class AVL_TreeNode<T> {
  value: T;
  left: AVL_TreeNode<T> | null;
  right: AVL_TreeNode<T> | null;
  count: number;
  height: number;
  constructor(v: T) {
    this.value = v;
    this.left = null;
    this.right = null;
    this.count = 1;
    this.height = 1;
  }
}

class AVL_Tree<T> {
  private root: AVL_TreeNode<T> | null;
  constructor() {
    this.root = null;
  }
  // insert value.
  insert(value: T): void {
    this.root = this._insertHelper(this.root, value);
  }
  // get value count. O(logN)
  count(value: T): number {
    return this._getCountHelper(this.root, value);
  }
  // remove value
  remove(value: T): void {
    this.root = this._removeHelper(this.root, value);
  }
  get min(): T | undefined {
    if (!this.root) {
      return undefined;
    }
    return this._findMin(this.root!).value;
  }
  get max() {
    if (!this.root) {
      return undefined;
    }
    return this._findMax(this.root!).value;
  }

  /** Helper*/
  private _insertHelper(node: AVL_TreeNode<T> | null, value: T): AVL_TreeNode<T> {
    // create node
    if (!node) {
      return new AVL_TreeNode(value);
    }

    // add new node
    // use binary search(recursive)
    if (value < node.value) {
      node.left = this._insertHelper(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertHelper(node.right, value);
    } else {
      // if new value is already exsistss, increment the count
      node.count++;
    }

    node.height = this._getNewHeight(node);
    const balanceFactor = this._getBalance(node);

    return this._balancingNode(node, balanceFactor, value);
  }

  private _getNewHeight(node: AVL_TreeNode<T>) {
    return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
  }
  private _getHeight(node: AVL_TreeNode<T> | null) {
    return node ? node.height : 0;
  }
  private _getBalance(node: AVL_TreeNode<T>): number {
    return this._getHeight(node.right) - this._getHeight(node.left);
  }
  private _balancingNode(node: AVL_TreeNode<T>, factor: number, value: T): AVL_TreeNode<T> {
    // if the right tree is long
    if (factor > 1) {
      if (value < node.right!.value) {
        return this._rotateLeft(node);
      } else {
        node.right = this._rotateRight(node.right!);
        return this._rotateLeft(node);
      }
    }
    // if the left tree is long
    else if (factor < -1) {
      if (value < node.left!.value) {
        return this._rotateRight(node);
      } else {
        node.left = this._rotateLeft(node.left!);
        return this._rotateRight(node);
      }
    }

    return node;
  }
  private _rotateLeft(node: AVL_TreeNode<T>): AVL_TreeNode<T> {
    const pivot = node.right!;
    node.right = pivot.left;
    pivot.left = node;

    node.height = this._getNewHeight(node);
    pivot.height = this._getNewHeight(pivot);

    return pivot;
  }
  private _rotateRight(node: AVL_TreeNode<T>): AVL_TreeNode<T> {
    const pivot = node.left!;
    node.left = pivot.right;
    pivot.right = node;

    node.height = this._getNewHeight(node);
    pivot.height = this._getNewHeight(pivot);

    return pivot;
  }
  private _getCountHelper(node: AVL_TreeNode<T> | null, value: T): number {
    // value is not exsists.
    if (!node) {
      return 0;
    }
    // binary search(recursive)
    if (value < node.value) {
      return this._getCountHelper(node.left, value);
    } else if (value > node.value) {
      return this._getCountHelper(node.right, value);
    } else {
      return node.count;
    }
  }
  private _removeHelper(node: AVL_TreeNode<T> | null, value: T): AVL_TreeNode<T> | null {
    // value is not exsists
    if (!node) {
      return null;
    }
    if (value < node.value) {
      node.left = this._removeHelper(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeHelper(node.right, value);
    } else {
      if (!node.left) {
        node = node.right;
      } else if (!node.right) {
        node = node.left;
      } else {
        const min = this._findMin(node.right);
        node.value = min.value;
        node.right = this._removeHelper(node.right, min.value);
      }

      if (node) {
        node.height = this._getNewHeight(node);
        const balanceFactor = this._getBalance(node);
        return this._balancingNode(node, balanceFactor, value);
      }
    }
    return node;
  }
  private _findMin(node: AVL_TreeNode<T>): AVL_TreeNode<T> {
    let curr = node;
    while (curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }
  private _findMax(node: AVL_TreeNode<T>): AVL_TreeNode<T> {
    let curr = node;
    while (curr.right !== null) {
      curr = curr.right;
    }
    return curr;
  }
}

// const tm = new AVL_Tree();
// tm.insert(3);
// tm.insert(5);
// tm.insert(4);
// tm.insert(2);
// tm.insert(6);
// tm.insert(1);

// console.log(tm.min, tm.max); // 1, 6
// tm.remove(tm.min);
// console.log(tm.min); // 2
// tm.remove(tm.max);
// console.log(tm.max); // 5
// tm.insert(3);
// console.log(tm.count(1));
// console.log(tm.count(2));
// console.log(tm.count(3)); //2
// console.log(tm.count(4));
// console.log(tm.count(5));
// console.log(tm.count(6));
