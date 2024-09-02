## jQuery Deferred

jQuery が提供する非同期処理を扱うための標準モジュール

### node Promise との共通点

- 非同期処理を管理し、成功または失敗の結果を処理するために利用する
- 成功時: resolve, 失敗時: reject を使って結果を返す
- then を利用して非同期処理の後続処理をチェーンすることができる

### 違い

- jQuery Deferred は Promise/A+ 仕様に完全に準拠してないが、Node Promise は準拠している
- jQuery Deferred は非同期操作の状態を自由に変更できるが、Node Promise は一度解決または拒否され後は、Promise の状態を変更できない

### 利用シーン

- jQuery Deferred は jQuery を利用したブラウザ環境での非同期処理に使われていた。
  しかし、最近では標準の Promise がサポートされるようになったので、使われなくなった。
- Node Promise は Node やモダンなブラウザ環境で広く使用されている。

### まとめ

jQuery の Deferred は十何な非同期処理の管理を提供するが、Node Promise は標準に準拠してシンプルで一貫性のある非同期処理を提供する。
現代での js の開発では Promise が推奨される標準的な手段となっている。
