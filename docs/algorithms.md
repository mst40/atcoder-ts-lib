# アルゴリズム

複雑度は入力サイズを n、辺数を m とした目安です。すべてのソースは export されていないスクリプト形式なので、提出コードへ必要な実装をコピーして使います。

| ファイル | API | 計算量 |
| --- | --- | --- |
| [Hopcroft-Karp](algorithms/Hopcroft-Karp.md) · [source](../algorithms/Hopcroft-Karp.ts) | HopcroftKarp | O(m√n) |
| [base-conversion](algorithms/base-conversion.md) · [source](../algorithms/base-conversion.ts) | baseConversion | O(log_base value) |
| [big-sort](algorithms/big-sort.md) · [source](../algorithms/big-sort.ts) | bigSort | O(n log n) |
| [big-sqrt](algorithms/big-sqrt.md) · [source](../algorithms/big-sqrt.ts) | bigSqrt | O(log value) bigint演算 |
| [bitwise-enumeration](algorithms/bitwise-enumeration.md) · [source](../algorithms/bitwise-enumeration.ts) | bitwiseEnumeration | 現実装 O(n²) |
| [calculate-XYdirection](algorithms/calculate-XYdirection.md) · [source](../algorithms/calculate-XYdirection.ts) | calXYdir | O(1) |
| [combinations](algorithms/combinations.md) · [source](../algorithms/combinations.ts) | combinations, combinations0toM | 出力サイズに比例 |
| [gcd](algorithms/gcd.md) · [source](../algorithms/gcd.ts) / [lcm](algorithms/lcm.md) · [source](../algorithms/lcm.ts) | gcd, lcm | O(log min(x,y)) |
| [lower-bound](algorithms/lower-bound.md) · [source](../algorithms/lower-bound.ts) / [upper-bound](algorithms/upper-bound.md) · [source](../algorithms/upper-bound.ts) | lowerBound, upperBound | O(log n) |
| [math](algorithms/math.md) · [source](../algorithms/math.ts) | math.as, math.sogp | O(1) |
| [merge-sort](algorithms/merge-sort.md) · [source](../algorithms/merge-sort.ts) | mergeSort | O(n log n) |
| [mod](algorithms/mod.md) · [source](../algorithms/mod.ts) / [mod-int](algorithms/mod-int.md) · [source](../algorithms/mod-int.ts) | Mod, ModInt, mod | pow O(log exponent) |
| [nCr-mod-int](algorithms/nCr-mod-int.md) · [source](../algorithms/nCr-mod-int.ts) / [ncr-mod](algorithms/ncr-mod.md) · [source](../algorithms/ncr-mod.ts) | nCrModInt, nCrMOD | O(max) 前処理 / O(n) 呼出 |
| [permutation](algorithms/permutation.md) · [source](../algorithms/permutation.ts) | Permutation, nextPermutation | O(n) / 次順列 |
| [prime-number](algorithms/prime-number.md) · [source](../algorithms/prime-number.ts) | sieveOfEratosthenes, primeFactorize | O(N log log N) / O(√v) |
| [rangeSum2D](algorithms/rangeSum2D.md) · [source](../algorithms/rangeSum2D.ts) | rangeSum2D | O(矩形面積) |
| [rotateArr](algorithms/rotateArr.md) · [source](../algorithms/rotateArr.ts) | rotate | O(hw) |
| [z-algorithm](algorithms/z-algorithm.md) · [source](../algorithms/z-algorithm.ts) | z_algorithm | O(n) |

## Hopcroft-Karp

`new HopcroftKarp(leftCount, rightCount)` で左右の頂点数を作り、`addEdge(u, v)` で辺を追加します。`maxMatching()` は最大マッチング数、`getMatches()` は対応する `[left, right]` の配列を返します。頂点番号は0始まりです。計算量は O(E√V)。

## 基数変換 — baseConversion

`baseConversion(value, base)` は数値を基数 base に変換します。**実装は剰余を下位桁から連結するため、結果が逆順**です。例: 13を2進数に渡すと `"1011"` が返り、通常の `"1101"` とは異なります。0は空文字列になり、負数・小数・基数の妥当性検査もありません。

## bigintソート・平方根

- `bigSort(arr, comparator)` は入力を変更せず comparator 順に並べます。昇順 comparator は `(a, b) => a < b`。
- `bigSqrt(value)` は Newton 法で `floor(sqrt(value))` を返します。非負 bigint を想定します。

bigSort は O(n log n)。bigSqrt は対数回の反復を行い、各反復で bigint 除算を使います。

## bitwiseEnumeration

部分集合を列挙する意図の関数ですが、**現在のループは 0..2*n-1 だけ**です。全 2^n 個の部分集合列挙にはなりません。ビット判定はJavaScriptの32bit演算です。

## 距離・組合せ

- `calXYdir(x1, y1, x2, y2)` はユークリッド距離を返します。
- `combinations(arr, size)` は入力順を保つ size 個の組を生成します。
- `combinations0toM(M, size)` は [0, M) から size 個の組を生成します。

組合せ関数は結果数と各組の要素数に比例する時間・メモリを使います。size は正の整数を想定し、`combinations(arr, 0)` は空の組を返す実装ではありません。

## gcd・lcm

`gcd(x, y)` はユークリッドの互除法、`lcm(x, y)` は `x * y / gcd(x, y)` です。lcm.ts は gcd.ts の `gcd` を同じスコープに必要とします。number精度、負数の符号、0を含む入力には注意してください。

## lowerBound・upperBound

昇順配列に対して `lowerBound(a, x)` は `a[i] >= x` となる最初のindex、`upperBound(a, x)` は `a[i] > x` となる最初のindexです。見つからないときは配列長を返します。いずれも O(log n)。

## 数列の和 — math

- `math.as(first, last, count)` は等差数列の和。
- `math.sogp(first, ratio, count)` は等比数列の和。

`sogp` は ratio=1 で除算が成立しません。その場合は `first * count` を使ってください。

## mergeSort

数値または bigint を昇順に並べます。O(n log n) 時間。**空配列では正しく動かず、値0を偽値としてInfinityに置き換えるため、0を含む配列も壊れます。** 現状のまま提出用途に使う前に修正が必要です。

## mod・mod-int

`Mod` は bigint の法を受け取り、`mod` は法10^9+7固定、`ModInt` はnumber版です。いずれも mul, pow, inv, div, nPr, fac（modオブジェクトには mul, pow, inv, div）を提供します。pow は繰り返し二乗法です。

逆元は Fermat の小定理を使うため、法が素数で、逆元対象が法と互いに素である必要があります。ModInt.mul はビット演算で積を分割する実装のため、値・法の大きさに制約があります。負の指数や nPr の範囲外引数は想定されません。

## 二項係数 — nCrModInt・nCrMOD

- `new nCrModInt(mod, max)` は 0..max-1 の階乗と逆元を前計算し、`nCr(n, r)` を O(1) で返します。n < max が必要です。
- `nCrMOD(n, r, mod)` は bigint引数で、呼出しごとに n まで前計算します。O(n) 時間・メモリ。

どちらも逆元を使うため、通常は素数法で階乗範囲が法より小さい条件が必要です。繰り返し問い合わせには前者が向いています。

## 順列

`Permutation(ary).allPerms()` は辞書順の順列を配列で返します。コンストラクタは入力配列を `sort()` で**破壊的に並べ替えます**。既定sortは文字列順なので数値では注意してください。重複値の順列は一意化しません。

`nextPermutation(numberArray)` は次の順列へ配列をその場で変更し、次がなければ false を返します。

## 素数

`sieveOfEratosthenes(N)` は N 以下の素数を返します。`primeFactorize(v)` は異なる素因数だけを昇順で返し、指数は返しません。Nは非負、vは正の整数を想定します。

## rangeSum2D・rotate

`rangeSum2D(grid, top, bot, left, right)` は行 [top, bot)、列 [left, right) の合計を直接走査します。各queryは矩形面積分の時間。境界を越える範囲があると0を返し、切り詰めません。

`rotate(grid)` は文字列配列を時計回りに90度回転します。実装は正方形行列を前提とし、長方形では正しい寸法になりません。

## Z algorithm

`z_algorithm(s)` は各接尾辞と先頭の一致長を返します。非空文字列では z[0] = s.length。O(n) 時間・メモリです。
