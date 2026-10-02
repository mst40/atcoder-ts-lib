class AVL_TreeNode<T> {
  value: T;
  left: AVL_TreeNode<T> | null;
  right: AVL_TreeNode<T> | null;
  height: number;
  constructor(n: T) {
    this.value = n;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL_Tree<T> {
  root: AVL_TreeNode<T> | null;
  constructor() {
    this.root = null;
  }

  insert(val: T) {
    this.root = this._insertHelper(this.root, val);
  }
  remove(val: T): boolean {
    const newTree = this._removeHelper(this.root, val);
    this.root = newTree;
    if (!newTree) {
      return false;
    }
    return true;
  }
  min(): T | undefined {
    if (!this.root) {
      return undefined;
    }
    return this._findMin(this.root!).value;
  }
  max() {
    if (!this.root) {
      return undefined;
    }
    return this._findMax(this.root!).value;
  }
  prev(val: T): T | undefined {
    return this._prevHelper(this.root, val);
  }

  next(val: T): T | undefined {
    return this._nextHelper(this.root, val);
  }

  /** private */
  private _insertHelper(node: AVL_TreeNode<T> | null, val: T): AVL_TreeNode<T> {
    if (!node) {
      return new AVL_TreeNode(val);
    }
    if (val < node.value) {
      node.left = this._insertHelper(node.left, val);
    } else if (node.value < val) {
      node.right = this._insertHelper(node.right, val);
    } else {
      return node;
    }

    node.height = this._newHeight(node);
    return this._balancing(node, val);
  }

  private _getBalanceFactor(node: AVL_TreeNode<T>): number {
    return this._getHeight(node.right) - this._getHeight(node.left);
  }
  private _getHeight(node: AVL_TreeNode<T> | null): number {
    return node ? node.height : 0;
  }
  private _newHeight(node: AVL_TreeNode<T>): number {
    return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
  }
  private _balancing(node: AVL_TreeNode<T>, val: T) {
    const factor = this._getBalanceFactor(node);
    if (factor < -1) {
      if (val < node.left!.value) {
        return this._rightRotate(node);
      } else {
        node.left = this._leftRotate(node.left!);
        return this._rightRotate(node);
      }
    } else if (1 < factor) {
      if (val > node.right!.value) {
        return this._leftRotate(node);
      } else {
        node.right = this._rightRotate(node.right!);
        return this._leftRotate(node);
      }
    }

    return node;
  }
  private _leftRotate(node: AVL_TreeNode<T>) {
    const pivot = node.right!;
    node.right = pivot ? pivot.left : null;
    if (pivot) pivot.left = node;

    node.height = this._newHeight(node);
    if (pivot) pivot.height = this._newHeight(pivot);

    return pivot || node;
  }

  private _rightRotate(node: AVL_TreeNode<T>) {
    const pivot = node.left!;
    node.left = pivot ? pivot.right : null;
    if (pivot) pivot.right = node;

    node.height = this._newHeight(node);
    if (pivot) pivot.height = this._newHeight(pivot);

    return pivot || node;
  }

  private _removeHelper(node: AVL_TreeNode<T> | null, val: T): AVL_TreeNode<T> | null {
    if (!node) {
      return null;
    }
    if (val < node.value) {
      node.left = this._removeHelper(node.left, val);
    } else if (val > node.value) {
      node.right = this._removeHelper(node.right, val);
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
        node.height = this._newHeight(node);
        return this._balancing(node, val);
      }
    }
    return node;
  }
  private _findMin(node: AVL_TreeNode<T>): AVL_TreeNode<T> {
    let curr = node;
    while (curr.left) {
      curr = curr.left;
    }
    return curr;
  }
  private _findMax(node: AVL_TreeNode<T>): AVL_TreeNode<T> {
    let curr = node;
    while (curr.right) {
      curr = curr.right;
    }
    return curr;
  }

  private _prevHelper(node: AVL_TreeNode<T> | null, val: T): T | undefined {
    if (!node) {
      return undefined;
    }

    if (val <= node.value) {
      return this._prevHelper(node.left, val);
    } else {
      const right = this._prevHelper(node.right, val);
      return right !== undefined ? right : node.value;
    }
  }

  private _nextHelper(node: AVL_TreeNode<T> | null, val: T): T | undefined {
    if (!node) {
      return undefined;
    }

    if (val >= node.value) {
      return this._nextHelper(node.right, val);
    } else {
      const left = this._nextHelper(node.left, val);
      return left !== undefined ? left : node.value;
    }
  }
}

const tm = new AVL_Tree();
tm.insert(3);
tm.insert(5);
tm.insert(4);
tm.insert(2);
tm.insert(6);
tm.insert(1);
tm.remove(1);
console.log(tm.min(), "min");
tm.insert(1);
console.log(tm.min(), "min");

console.log(tm.min(), tm.max()); // 1, 6
tm.remove(tm.min());
console.log(tm.min()); // 1
tm.remove(tm.min());
console.log(tm.min()); // 2
tm.remove(tm.max());
console.log(tm.max()); // 5
tm.insert(3);
