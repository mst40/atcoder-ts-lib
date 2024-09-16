
class UnionFind {
    private parent: number[];
    private size: number[];

    constructor(arrLen: number) {
      this.parent = new Array<number>(arrLen + 1).fill(0).map((v, i) => i);
      this.size = new Array<number>(arrLen + 1).fill(1);
    }

    private find(target: number): number {
      if (target !== this.parent[target]) {
        return (this.parent[target] = this.find(this.parent[target]));
      }
      return target;
    }

    public unite(a: number, b: number): void {
      let [ap, bp] = [this.find(a), this.find(b)];
      if (ap !== bp) {
        if (this.size[ap] < this.size[bp]) {
          [ap, bp] = [bp, ap];
        }
        this.parent[bp] = ap;
        this.size[ap] += this.size[bp];
      }
    }

    public getParent(v: number) {
      return this.find(v);
    }

    public getSize(v: number) {
      return this.size[this.find(v)];
    }
  }

