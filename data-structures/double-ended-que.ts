/**
 * 簡易的な実装なのでbackに入る値が多すぎると壊れる (42 * 1e8)
 *
 * @class DoubleEndedQue
 */
class DoubleEndedQue {
  front: number[][];
  back: number[][];
  pointer: number = 0;
  constructor() {
    this.front = new Array();
    this.back = new Array();
  }

  push_front = (v: number[]) => {
    this.front.push(v);
  };

  push_back = (v: number[]) => {
    this.back.push(v);
  };

  pop = (): number[] | undefined => {
    if (this.isEmpty()) return undefined;

    if (this.front.length == 0) {
      return this.popBack();
    } else {
      return this.front.pop();
    }
  };

  popBack = () => {
    return this.back[this.pointer++];
  };

  isEmpty = () => {
    if (this.front.length == 0 && this.back.length == this.pointer) {
      return true;
    }

    return false;
  };
}
