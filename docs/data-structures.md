# データ構造

複雑度は一般的な入力での目安です。ソースは export されていないため、説明中の識別子は提出コードへ実装をコピーした後に使います。

| ファイル | API | 主な操作 |
| --- | --- | --- |
| [avl-tree](data-structures/avl-tree.md) · [source](../data-structures/avl-tree.ts) | AVL_Tree | 挿入・削除・探索 O(log n) |
| [cumulative-sum](data-structures/cumulative-sum.md) · [source](../data-structures/cumulative-sum.ts) | CumulativeSum | 構築 O(n)、query O(1) |
| [cumulativeSum2D](data-structures/cumulativeSum2D.md) · [source](../data-structures/cumulativeSum2D.ts) | CumulativeSum2D | 構築 O(hw)、query O(1) |
| [double-ended-que](data-structures/double-ended-que.md) · [source](../data-structures/double-ended-que.ts) | DoubleEndedQue | push/pop 償却 O(1) |
| [doubly-linked-list](data-structures/doubly-linked-list.md) · [source](../data-structures/doubly-linked-list.ts) | DoublyLinkedList | index操作 O(n) |
| [fenwick-tree](data-structures/fenwick-tree.md) · [source](../data-structures/fenwick-tree.ts) | FenwickTree | add/prefix sum O(log n) |
| [imos](data-structures/imos.md) · [source](../data-structures/imos.ts) | Imos | 範囲更新 O(1)、復元 intended O(n) |
| [lrud](data-structures/lrud.md) · [source](../data-structures/lrud.ts) | moveLRUD | 移動 O(1) |
| [priority-queue](data-structures/priority-queue.md) · [source](../data-structures/priority-queue.ts) | PriorityQueue | push/pop O(log n)、top O(1) |
| [lazy-segtree](data-structures/lazy-segtree.md) · [source](../data-structures/lazy-segtree.ts) | LazySegTree | range assignment/query O(log n) |
| [segtree](data-structures/segtree.md) · [source](../data-structures/segtree.ts) | SegmentTree | point update/range query O(log n) |
| [tree-multi-set](data-structures/tree-multi-set.md) · [source](../data-structures/tree-multi-set.ts) | TreeMultiSet | 操作 O(log n) |
| [trie-tree](data-structures/trie-tree.md) · [source](../data-structures/trie-tree.ts) | TrieTree | 文字列長Lに対し O(L) |
| [union-find](data-structures/union-find.md) · [source](../data-structures/union-find.ts) | UnionFind | unite/find 償却 O(α(n)) |

## AVL tree — AVL_Tree

比較可能な値を重複なしで保持する平衡二分探索木です。insert, remove, min, max に加え、prev(value) は厳密に小さい最大値、next(value) は厳密に大きい最小値を返します。

空木のmin/maxや、隣接値がない場合は undefined です。**removeの真偽値は削除成功を表しません**。対象がなくても木が非空なら true、最後の1要素を削除すると false になります。

## 1次元累積和 — CumulativeSum

コンストラクタに配列を渡し、`rangeSum(s, e)` で半開区間 [s, e) の和を得ます。`sum(i)` は先頭からindex iまで（iを含む）の累積和です。空配列はサポートしません。

## 2次元累積和 — CumulativeSum2D

`getRangeSum(y1, x1, y2, x2)` は両端を含む矩形の和を返します。座標は0始まり。負の開始座標は0扱い、大きすぎる終了座標は配列端へ丸めます。

## DoubleEndedQue

APIは push_front, push_back, pop, isEmpty で、値の型は number[] です。front側は配列末尾から取り出すためLIFO、back側は追加順に取り出すFIFOです。一般的なdequeの両端操作と異なります。消費済みback領域を詰めないので、長時間の大量利用ではメモリを消費します。

## DoublyLinkedList

コンストラクタに初期値を渡して1要素で開始します。addHead, addTail, addAtIndex, delete, printList を提供し、indexは0始まりです。空リスト開始には対応しません。addAtIndex は index < len のみ受け付け、末尾挿入は addTail を使います。変更操作は内容をconsole.logする副作用があります。境界操作には制約があるため、非空かつ有効なindexで使ってください。

## FenwickTree

`new FenwickTree(size)` はsize個の0始まり要素を扱います。`add(i, delta)` は点への加算、`sum(i)` は [0, i] のprefix sumです。閉区間 [l, r] の和は sum(r)-sum(l-1)、l=0ならsum(r)です。

## Imos

`add(s, t, value)` は半開区間 [s, t) への加算を差分配列へ記録します。**現在のsum()は未初期化出力配列へ加算するため、要素がNaNになります。** 更新記録には使えますが、sum()で復元した結果は利用できません。

## グリッド移動 — moveLRUD

`moveLRUD(grid, dir, i, j)` は L/R/U/D への1マス移動先を返します。移動できなければ元の座標です。座標は0始まり。空でない長方形gridを想定します。

## PriorityQueue

`new PriorityQueue("asc" | "des")` で優先順を選びます。`push(key, priority = Number(key))`、`pop()`、`top()`、`isEmpty()` を提供し、pop/topは [key, priority] を返します。priorityはnumber。空ならpopはundefinedですが、topは空キューで安全ではないため、先にisEmpty()を確認してください。

## TreeMultiSet

AVL木ベースで値を個数付きで保持します。insert, remove, count, min, max のほか、lower_bound(以上の最小値)、upper_bound(より大きい最小値)、prev(厳密に小さい値)、next(厳密に大きい値) を提供します。**removeの真偽値は削除成功を正しく示さない**ため、削除後にcountで確認してください。

## TrieTree

insert, hasExactMatch, hasPrefixMatch, getMatchNum, delete を提供します。getMatchNum(s) は登録語判定ではなく、既存trie経路と共有する先頭文字数です。各操作は文字列長Lに対してO(L)。

deleteは登録語の終端フラグを確認しないため、登録されていないprefixでも末尾ノードが存在するとtrueを返すことがあります。戻り値だけで登録有無を判断しないでください。

## UnionFind

`new UnionFind(n)` は頂点 0..n-1 を作成します。`unite(a, b)` は異なる成分を結合した場合true、既に同じならfalse。`isUnite(a, b)` は連結判定、`getParent(v)` は代表元、`getSize(v)` は成分サイズ、`unionCnt` は成分数です。経路圧縮とunion by sizeを使い、操作は償却 O(α(n))。
