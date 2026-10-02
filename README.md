# atcoder-ts-lib

競技プログラミングで使う TypeScript のアルゴリズム・データ構造集です。

## ドキュメント

- [アルゴリズム一覧と使い方](docs/algorithms.md)
- [データ構造一覧と使い方](docs/data-structures.md)

各項目は現在のソースコードを基準に説明しています。一般的な定義と異なる挙動や利用上の制約は、各ページに明記しています。

## 利用方法

ソースは独立したスクリプト形式で、クラス・関数を `export` していません。AtCoder の提出コードで使う場合は、必要な実装を提出ファイルへコピーしてください。複数ファイルを連結するときは、同名宣言の衝突に注意してください。たとえば [lcm.ts](algorithms/lcm.ts) は [gcd.ts](algorithms/gcd.ts) の `gcd` を同じスコープに必要とします。

## テスト

```sh
npm install
npm test
npx tsc --noEmit
```

テストは Node.js 標準の `node:test` を使用し、各ライブラリファイルに対応する個別テストを `tests/` に配置しています.
