## 予想

false false
true false

と表示される

## 結果

false true
true false

nm は ネストした関数として定義されているので、this はグローバルまたは undefined となる
したがって、はじめの `this === obj` は false となり、`this === nest` は true となる

arrow はアロー関数として定義されているので、this キーワードは呼び出しコンテキストを取得できる。
したがって、`this === obj` は true となり、`this === nest` は false となる
