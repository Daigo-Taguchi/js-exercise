## グローバルオブジェクトを参照する方法

### ブラウザ内

ブラウザ内では `window` がグローバルオブジェクトとなる

```
var foo = "foobar"
console.log(window.foo) // "foobar"
```

このように window オブジェクトからプロパティ名として直接アクセスすることができる

### node 内

node 内では `global` がグローバルオブジェクトとなる
global オブジェクトからプロパティ名として直接アクセスすることができる

```
var foo = "foobar"
console.log(global.foo) // "foobar"
```

### ブラウザ / node 内問わずの方法

ブラウザ / node 内共通で `globalThis` がグローバルオブジェクトとなる
globalThis オブジェクトからプロパティ名として直接アクセスすることができる

```
var foo = "foobar"
console.log(globalThis.foo) // "foobar"
```

すべての環境で共通の js のコードを動かしたい場面で使えるのかな、と理解しました

## ブラウザ独自のグローバルオブジェクトのプロパティ

1. document
2. localStorage
3. sessionStorage
4. location
5. navigator
6. history
7. screen
8. frames
9. alert
10. innerWidth

node.js の global オブジェクトのプロパティ一覧が見当たらなかったので
ブラウザで独自のものと予想したものを書きました。。。

window のプロパティ一覧
https://developer.mozilla.org/ja/docs/Web/API/Window

## 過去の ES 仕様でどのような問題が発生していたか

グローバルオブジェクトの中に undefined が定義されている
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined#%E8%A7%A3%E8%AA%AC

ブラウザ内で window.undefined でアクセス可能

undefined がプロパティのひとつなので、再代入や上書きが可能であった
それにより、既存のコードで利用している undefined がすべてほかの値に書き換わってしまい、正しく動作しない問題があった

ES5 以降は undefined は読み取り専用のプロパティとして定義されて、再代入や上書きができなくなった
