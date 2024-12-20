## TailWind CSS について

- Tailwind CSSは「ユーティリティファースト」なCSSフレームワーク
- HTML要素のクラス名に `flex pt-4 text-center` といったユーティリティクラスを指定をすると対応するスタイルが当たる

## 便利な点

- css の実装が簡単になる
  - よく使われるような css も簡単なクラス名で表現できるため、簡潔に書ける
- マークアップとスタイルを別々のファイルに書く必要が無い
  - React なら jsx の中にクラス名によってスタイルを記述することができる
- 単位が統一されているので、スタイル全体に単位の規約を自然と適用することができる
  - 複数人で実装する際に便利
- カラーパレットを持っているので、それぞれの色を `blue-500` のように記述できる
  - スタイル全体で色の規約の導入もできる
