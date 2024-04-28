{
  class Node {
    prev: Node | null;
    next: Node | null;
    val: number | null;
    constructor(val: number) {
      this.prev = null;
      this.next = null;
      this.val = val;
    }
  }

  class TwoWayList {
    head: Node;
    len: number;
    tail: Node;
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
      let newNode = new Node(val);
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;

      this.len++;
      this.printList();
    }

    addHead(val: number) {
      if (!Number.isInteger(val)) {
        console.error(`Invalid value`);
        return this;
      }
      let newNode = new Node(val);
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;

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

      let newNode = new Node(val);
      let prevNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        prevNode = prevNode.next!;
      }
      let nextNode = prevNode.next;

      newNode.next = nextNode;
      prevNode.next = newNode;
      newNode.prev = prevNode;
      nextNode!.prev = newNode;

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
      let prevNode = curr.prev;
      let nextNode = curr.next;

      prevNode!.next = nextNode;
      nextNode!.prev = prevNode;

      this.len--;
      this.printList();
    }
  }
}
