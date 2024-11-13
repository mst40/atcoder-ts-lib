class TreeSetNode<T> {
  value: T;
  left: TreeSetNode<T> | null;
  right: TreeSetNode<T> | null;
  height: number;
  count: number;
  constructor(n: T) {
    this.value = n;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.count = 1;
  }
  incCnt() {
    this.count++;
  }
  decCnt() {
    this.count--;
  }
}
class TreeMultiSet<T> {
  root: TreeSetNode<T> | null;
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
  count(value: T): number {
    return this._getCountHelper(this.root, value);
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
  lower_bound(val: T) {
    return this._lower_boundHelper(this.root, val);
  }
  upper_bound(val: T) {
    return this._upper_boundHelper(this.root, val);
  }
  prev(val: T): T | undefined {
    return this._prevHelper(this.root, val);
  }

  next(val: T): T | undefined {
    return this._nextHelper(this.root, val);
  }

  /** private */
  private _insertHelper(node: TreeSetNode<T> | null, val: T): TreeSetNode<T> {
    if (!node) {
      return new TreeSetNode(val);
    }
    if (val < node.value) {
      node.left = this._insertHelper(node.left, val);
    } else if (node.value < val) {
      node.right = this._insertHelper(node.right, val);
    } else {
      node.incCnt();
      return node;
    }

    node.height = this._newHeight(node);
    return this._balancing(node, val);
  }

  private _getBalanceFactor(node: TreeSetNode<T>): number {
    return this._getHeight(node.right) - this._getHeight(node.left);
  }
  private _getHeight(node: TreeSetNode<T> | null): number {
    return node ? node.height : 0;
  }
  private _newHeight(node: TreeSetNode<T>): number {
    return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
  }
  private _balancing(node: TreeSetNode<T>, val: T) {
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
  private _leftRotate(node: TreeSetNode<T>) {
    const pivot = node.right!;
    node.right = pivot ? pivot.left : null;
    if (pivot) pivot.left = node;

    node.height = this._newHeight(node);
    if (pivot) pivot.height = this._newHeight(pivot);

    return pivot || node;
  }

  private _rightRotate(node: TreeSetNode<T>) {
    const pivot = node.left!;
    node.left = pivot ? pivot.right : null;
    if (pivot) pivot.right = node;

    node.height = this._newHeight(node);
    if (pivot) pivot.height = this._newHeight(pivot);

    return pivot || node;
  }
  private _getCountHelper(node: TreeSetNode<T> | null, value: T): number {
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
  private _removeHelper(node: TreeSetNode<T> | null, val: T): TreeSetNode<T> | null {
    if (!node) {
      return null;
    }
    if (val < node.value) {
      node.left = this._removeHelper(node.left, val);
    } else if (val > node.value) {
      node.right = this._removeHelper(node.right, val);
    } else {
      if (1 < node.count) {
        node.decCnt();
        return node;
      }
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
  private _findMin(node: TreeSetNode<T>): TreeSetNode<T> {
    let curr = node;
    while (curr.left) {
      curr = curr.left;
    }
    return curr;
  }
  private _findMax(node: TreeSetNode<T>): TreeSetNode<T> {
    let curr = node;
    while (curr.right) {
      curr = curr.right;
    }
    return curr;
  }
  private _lower_boundHelper(node: TreeSetNode<T> | null, val: T): T | undefined {
    if (!node) {
      return undefined;
    }

    if (val <= node.value) {
      const left = this._lower_boundHelper(node.left, val);
      return left !== undefined ? left : node.value;
    } else {
      return this._lower_boundHelper(node.right, val);
    }
  }
  private _upper_boundHelper(node: TreeSetNode<T> | null, val: T): T | undefined {
    if (!node) {
      return undefined;
    }

    if (val < node.value) {
      const left = this._upper_boundHelper(node.left, val);
      return left !== undefined ? left : node.value;
    } else {
      return this._upper_boundHelper(node.right, val);
    }
  }
  private _prevHelper(node: TreeSetNode<T> | null, val: T): T | undefined {
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

  private _nextHelper(node: TreeSetNode<T> | null, val: T): T | undefined {
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

/**
 * TreeSetNode class
 * Propaties
 * value:
 *  The value stored in the node.
 *  ノード内の値
 *
 * left:
 *  A reference to the left child node.
 *  左子ノードの参照
 *
 * right:
 *  A reference to the right child node.
 *  右子ノードの参照
 *
 * height:
 *  The height of the node in the tree
 *  ツリー内でのノードの高さ
 *
 * count:
 *  The number of occurrences of the value in the TreeSet
 *  その値の数
 *
 *
 * TreeSet class
 * Methods
 * insert(val:T):
 *  Add value 'val' into the TreeSet.
 *  TreeSetに値valを追加する。
 *
 * remove(val:T):
 *  Remove value 'val' from the TreeSet.
 *  TreeSetから値valを削除する
 *
 * min():
 *  Return minimum value in TreeSet.
 *  TreeSet内の最小値を返す。
 *
 * max():
 *  Return maximum value in TreeSet.
 *  TreeSet内の最大値を返す。
 *
 * lower_bound(val:T):
 *  Return the smallest value in the TreeSet that is greater than or equal to the given value,
 *  or undefind if no such value exsists.
 *  TreeSet内の値val "以上" の値の中での最小値を返す。
 *
 * upper_bound(val:T):
 *  Return the smallest value in the TreeSet that is greater than the given value,
 *  or undefind if no such value exsists.
 *  TreeSet内の値val "よりも大きい" 値の中での最小値を返す。
 *
 *
 *
 */
