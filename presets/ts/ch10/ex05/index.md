# リファクタリング機能の動き

## Node のモジュール方式

- 関数
  - export 文の中でリネーム前の名前にリネームされる(import 側はリネーム前の名前を利用)
  - hoge から hoge2 に変更した場合
  - `module.exports = { hoge: hoge2 };`
- クラス
  - 関数と同様に、export 文の中でリネーム前の名前にリネームされる(import 側はリネーム前の名前を利用)

## ES6 のモジュール方式

### 通常の export

- 関数
  - import 文の関数名が変更される
  - hoge から hogehoge に変更した場合
  - `import hoge` -> `import hogehoge`
- クラス
  - import 文のクラス名が変更される
  - Hoge から Hogehoge に変更した場合
  - `import Hoge` -> `import Hogehoge`

### default export

- 関数
  - import 文の関数名が変更される
- クラス
  - import 文のクラス名が変更される

### 名前変更を伴うインポート

- 関数
  - import 文の名前変更元の関数名が変更される
  - hoge から hogehoge に変更した場合
  - `import hoge as hoge1` -> `import hogehoge as hoge1`
- クラス
  - import 文のクラス名が変更される
  - Hoge から Hogehoge に変更した場合
  - `import Hoge as Hoge1` -> `import Hogehoge as hoge1`

### 再エクスポート

- 関数
  - 再エクスポート側で名前変更前のエクスポートに変更される
  - `export hoge` -> `export { hoge } from "..."` -> `import hoge from "..."`
  - `export hoge2` -> `export { hoge2 as hoge } from "..."` -> `import hoge from "..."`
- クラス
  - 再エクスポート側で名前変更前のエクスポートに変更される
  - `export Hoge` -> `export { Hoge } from "..."` -> `import Hoge from "..."`
  - `export Hoge2` -> `export { Hoge2 as Hoge } from "..."` -> `import Hoge from "..."`
