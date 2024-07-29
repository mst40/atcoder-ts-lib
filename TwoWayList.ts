class DoublyLinkedListNode {
  prev: DoublyLinkedListNode | null;
  next: DoublyLinkedListNode | null;
  val: number | null;
  constructor(val: number) {
    this.prev = null;
    this.next = null;
    this.val = val;
  }
}

class DoublyLinkedList {
  head: DoublyLinkedListNode;
  len: number;
  tail: DoublyLinkedListNode;
  constructor(val: number) {
    this.head = {
      val: val,
      next: null,
      prev: null,
    };
    this.len = 1;
    this.tail = this.head;
  }

  printList() {
    let array = [];
    let currList = this.head;
    while (currList !== null) {
      array.push(currList.val);
      currList = currList.next!;
    }
    console.log(array.join(" "));
    return this;
  }

  addTail(val: number) {
    if (!Number.isInteger(val)) {
      console.error(`Invalid value`);
      return this;
    }
    let newDoublyLinkedListNode = new DoublyLinkedListNode(val);
    this.tail.next = newDoublyLinkedListNode;
    newDoublyLinkedListNode.prev = this.tail;
    this.tail = newDoublyLinkedListNode;

    this.len++;
    this.printList();
  }

  addHead(val: number) {
    if (!Number.isInteger(val)) {
      console.error(`Invalid value`);
      return this;
    }
    let newDoublyLinkedListNode = new DoublyLinkedListNode(val);
    this.head.prev = newDoublyLinkedListNode;
    newDoublyLinkedListNode.next = this.head;
    this.head = newDoublyLinkedListNode;

    this.len++;
    this.printList();
  }

  addAtIndex(index: number, val: number) {
    if (!Number.isInteger(index) || index < 0 || index >= this.len) {
      console.error(`Invalid index. Current index is ${this.len}`);
      return this;
    }
    if (index === 0) {
      this.addHead(val);
      return this;
    }
    if (index === this.len) {
      this.addTail(val);
      return this;
    }

    let newDoublyLinkedListNode = new DoublyLinkedListNode(val);
    let prevDoublyLinkedListNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      prevDoublyLinkedListNode = prevDoublyLinkedListNode.next!;
    }
    let nextDoublyLinkedListNode = prevDoublyLinkedListNode.next;

    newDoublyLinkedListNode.next = nextDoublyLinkedListNode;
    prevDoublyLinkedListNode.next = newDoublyLinkedListNode;
    newDoublyLinkedListNode.prev = prevDoublyLinkedListNode;
    nextDoublyLinkedListNode!.prev = newDoublyLinkedListNode;

    this.len++;
    this.printList();
  }

  delete(index: number) {
    if (!Number.isInteger(index) || index < 0 || index >= this.len) {
      console.error(`Invalid index. Current index is ${this.len}`);
      return this;
    }

    if (index === 0) {
      this.head = this.head.next!;
      this.head.prev = null;

      this.len--;
      this.printList();
      return this;
    }

    if (index === this.len - 1) {
      this.tail = this.tail.prev!;
      this.tail.next = null;

      this.len--;
      this.printList();
      return this;
    }

    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr.next!;
    }
    let prevDoublyLinkedListNode = curr.prev;
    let nextDoublyLinkedListNode = curr.next;

    prevDoublyLinkedListNode!.next = nextDoublyLinkedListNode;
    nextDoublyLinkedListNode!.prev = prevDoublyLinkedListNode;

    this.len--;
    this.printList();
  }
}
