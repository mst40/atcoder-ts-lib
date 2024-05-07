class OrderedSetNode<T> {
  value: T;
  left: OrderedSetNode<T> | null;
  right: OrderedSetNode<T> | null;
  height: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class OrderedSet<T> {
  private root: OrderedSetNode<T> | null = null;
  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: OrderedSetNode<T> | null, value: T): OrderedSetNode<T> {
    if (node === null) {
      return new OrderedSetNode<T>(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    return this.balance(node, value);
  }

  private balance(node: OrderedSetNode<T>, value: T): OrderedSetNode<T> {
    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1 && value < node.left!.value) {
      return this.rightRotate(node);
    }

    if (balanceFactor < -1 && value > node.right!.value) {
      return this.leftRotate(node);
    }

    if (balanceFactor > 1 && value > node.left!.value) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    if (balanceFactor < -1 && value < node.right!.value) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  private leftRotate(node: OrderedSetNode<T>): OrderedSetNode<T> {
    const pivot = node.right!;
    node.right = pivot.left;
    pivot.left = node;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    pivot.height = Math.max(this.getHeight(pivot.left), this.getHeight(pivot.right)) + 1;

    return pivot;
  }

  private rightRotate(node: OrderedSetNode<T>): OrderedSetNode<T> {
    const pivot = node.left!;
    node.left = pivot.right;
    pivot.right = node;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    pivot.height = Math.max(this.getHeight(pivot.left), this.getHeight(pivot.right)) + 1;

    return pivot;
  }

  private getHeight(node: OrderedSetNode<T> | null): number {
    return node === null ? 0 : node.height;
  }

  private getBalanceFactor(node: OrderedSetNode<T>): number {
    return this.getHeight(node.right) - this.getHeight(node.left);
  }

  min(): T | null {
    let current = this.root;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current?.value ?? null;
  }

  max(): T | null {
    let current = this.root;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current?.value ?? null;
  }

  contains(value: T): boolean {
    let current = this.root;
    while (current !== null) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }

  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(node: OrderedSetNode<T> | null, value: T): OrderedSetNode<T> | null {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left !== null) {
        const successor = this.findMax(node.left);
        node.value = successor.value;
        node.left = this.removeNode(node.left, successor.value);
      } else {
        const successor = this.findMax(node.right!);
        node.value = successor.value;
        node.right = this.removeNode(node.right, successor.value);
      }
    }

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    return this.balance(node, value);
  }

  private findMax(node: OrderedSetNode<T>): OrderedSetNode<T> {
    let current = node;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  toList(): T[] {
    const values: T[] = [];
    this.traverseInOrder(this.root, values);
    return values;
  }

  private traverseInOrder(node: OrderedSetNode<T> | null, values: T[]): void {
    if (node === null) {
      return;
    }

    this.traverseInOrder(node.left, values);
    values.push(node.value);
    this.traverseInOrder(node.right, values);
  }
}
