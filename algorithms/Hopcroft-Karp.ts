class HopcroftKarp {
  private l: number;
  private r: number;
  private to: number[][];

  private pairU: number[];
  private pairV: number[];
  private dist: number[];

  constructor(l: number, r: number) {
    this.l = l;
    this.r = r;

    this.to = Array.from({ length: l }, () => []);

    this.pairU = new Array(l).fill(-1);
    this.pairV = new Array(r).fill(-1);
    this.dist = new Array(l).fill(0);
  }

  addEdge(u: number, v: number) {
    this.to[u].push(v);
  }

  private bfs(): boolean {
    const queue: number[] = [];

    for (let u = 0; u < this.l; u++) {
      if (this.pairU[u] === -1) {
        this.dist[u] = 0;
        queue.push(u);
      } else {
        this.dist[u] = Infinity;
      }
    }

    let found = false;

    for (const u of queue) {
      for (const v of this.to[u]) {
        const nu = this.pairV[v];

        if (nu !== -1 && this.dist[nu] === Infinity) {
          this.dist[nu] = this.dist[u] + 1;
          queue.push(nu);
        }

        if (nu === -1) {
          found = true;
        }
      }
    }

    return found;
  }

  private dfs(u: number): boolean {
    for (const v of this.to[u]) {
      const nu = this.pairV[v];

      if (nu === -1 || (this.dist[nu] === this.dist[u] + 1 && this.dfs(nu))) {
        this.pairU[u] = v;
        this.pairV[v] = u;
        return true;
      }
    }

    this.dist[u] = Infinity;
    return false;
  }

  maxMatching(): number {
    let matching = 0;

    while (this.bfs()) {
      for (let u = 0; u < this.l; u++) {
        if (this.pairU[u] === -1 && this.dfs(u)) {
          matching++;
        }
      }
    }

    return matching;
  }

  getMatches(): Array<[number, number]> {
    const res: Array<[number, number]> = [];
    for (let u = 0; u < this.l; u++) {
      if (this.pairU[u] !== -1) {
        res.push([u, this.pairU[u]]);
      }
    }
    return res;
  }
}
