import { BaseGraph, AdjIterable, AdjIterator, IterationResult } from './interface'

// 稀疏图  - 邻接表
export default class SparseGraph implements BaseGraph {
  private n: number // 点数
  private m: number = 0 // 边数
  private directed: boolean // 有向图 
  private g: number[][] = []

  constructor(n: number, directed: boolean) {
    this.n = n
    this.directed = directed
    for (let index = 0; index < n; index++) {
      this.g.push([])
    }
  }

  V(): number {
    return this.n
  }

  E(): number {
    return this.m
  }

  addEdge(v: number, w: number) {
    if (v < 0 || v >= this.n) throw new Error()
    if (w < 0 || w >= this.n) throw new Error()

    // 去掉平行边 时间成本高 会将时间复杂度提升到O(n)
    // if (this.hasEdge(v, w)) return

    this.g[v].push(w)
    if (v !== w && !this.directed) // 不是自环边且不是有向图
      this.g[w].push(v)

    this.m++
  }

  // O(n) 时间复杂度
  hasEdge(v: number, w: number): boolean {
    if (v < 0 || v >= this.n) throw new Error()
    if (w < 0 || w >= this.n) throw new Error()

    return this.g[v].some(e => e === w)
  }


  // O(E)
  makeIterator(v: number): AdjIterable {
    const self = this;
    return {
      [Symbol.iterator]() {
        let index = 0;
        return {
          next() {
            if (index < self.g[v].length) {
              return {
                value: self.g[v][index++],
                done: false
              };
            } else {
              return { value: undefined, done: true };
            }
          }
        }
      }
    }
  }
}