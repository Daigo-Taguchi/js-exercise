## React

JSX 内の式の埋め込みでは、基本的に HTML として解釈されないようにエスケープされていて
XSS の対策はされている

### 残っている XSS の危険性

- dangerouslySetInnerHTML の利用
  - エスケープを無効化するオプションが存在している
  - これを利用した場合は XSS が発生する可能性がある
- javascript スキームの利用
  - href 属性は先頭が `javascript:` から始まる場合はそれ以降の文字列を js として実行する
  - window.location オブジェクトの操作ができてしまうので、XSS の危険性がある
