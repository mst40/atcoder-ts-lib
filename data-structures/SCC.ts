class SCC {
  G: number[][];
  rG: number[][];

  scc: number[][] = [];
  cmp: number[] = [];
  dag: number[][] = [];

  visited: boolean[] = [];
  vs: number[] = [];
  rvs: number[] = [];

  constructor(N: number) {
    this.G = Array.from({ length: N }, () => []);
    this.rG = Array.from({ length: N }, () => []);
  }

  addEdge(u: number, v: number): void {
    this.G[u].push(v);
    this.rG[v].push(u);
  }

  dfs(u: number): void {
    this.visited[u] = true;
    for (const v of this.G[u]) {
      if (!this.visited[v]) {
        this.dfs(v);
      }
    }
    this.vs.push(u);
  }

  rdfs(u: number, k: number): void {
    this.visited[u] = true;
    this.cmp[u] = k;
    for (const e of this.rG[u]) {
      if (!this.visited[e]) {
        this.rdfs(e, k);
      }
    }
    this.rvs.push(u);
  }

  reconstruct(): void {
    const N: number = this.G.length;
    const dv = this.scc.length;

    this.dag = Array.from({ length: dv }, () => []);
    const set: Set<string> = new Set();

    for (let i = 0; i < N; i++) {
      const u = this.cmp[i];
      for (const e of this.G[i]) {
        const v = this.cmp[e];
        if (u === v) {
          continue;
        }

        const key = `${u},${v}`;
        if (!set.has(key)) {
          this.dag[u].push(v);
          set.add(key);
        }
      }
    }
  }

  solve(): void {
    const N: number = this.G.length;

    this.visited = new Array(N).fill(false);
    this.vs = [];
    for (let v = 0; v < N; v++) {
      if (!this.visited[v]) {
        this.dfs(v);
      }
    }

    let k: number = 0;
    this.scc = [];
    this.cmp = new Array(N).fill(-1);
    this.visited = new Array(N).fill(false);
    for (let i = N - 1; i >= 0; i--) {
      const v = this.vs[i];
      if (!this.visited[v]) {
        this.rvs = [];
        this.rdfs(v, k++);
        this.scc.push([...this.rvs]);
      }
    }

    this.reconstruct();
  }
}
