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

class TreeSet<T> {
  root: TreeSetNode<T> | null;
  constructor() {
    this.root = null;
  }

  insert(val: T) {
    this.root = this._insertHelper(this.root, val);
  }
  remove(val: T): boolean {
    const newTree = this._removeHelper(this.root, val);
    if (!newTree) {
      return false;
    }
    this.root = newTree;
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
  lower_bound(val: T) {
    return this._lower_boundHelper(this.root, val);
  }
  upper_bound(val: T) {
    return this._upper_boundHelper(this.root, val);
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
    node.right = pivot.left;
    pivot.left = node;

    node.height = this._newHeight(node);
    pivot.height = this._newHeight(pivot);

    return pivot;
  }
  private _rightRotate(node: TreeSetNode<T>) {
    const pivot = node.left!;
    node.left = pivot.right;
    pivot.right = node;

    node.height = this._newHeight(node);
    pivot.height = this._newHeight(pivot);

    return pivot;
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
}

// const ts = new TreeSet();
// ts.insert(2);
// ts.insert(3);
// ts.insert(4);
// ts.insert(5);
// console.log(ts.min(), ts.max());
// ts.insert(6);
// console.log(ts.min(), ts.max());
// ts.insert(1);
// console.log(ts.min(), ts.max());

// console.log(ts.lower_bound(4));
// console.log(ts.lower_bound(6));
// console.log(ts.upper_bound(4));
// console.log(ts.upper_bound(6));
// ts.remove(4);
// console.log(ts.lower_bound(1));
// console.log(ts.upper_bound(1));
// ts.insert(1);
// ts.remove(1);
// console.log(ts.min());
// ts.remove(1);
// console.log(ts.min());
