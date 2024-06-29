## 考えられる問題

Function コンストラクタに渡された変数はグローバルスコープを参照する
例のコードでは `input` 変数が渡されているが、これは関数 f のパラメータの `input` を参照するのではなく、
グローバルスコープの変数 `input` を参照してしまう。

したがって、Web サービスの利用者が入力した文字列が表示されるのではなく、コード内のグローバルスコープの `input` の値が表示されてしまう

## 実証できるコードについて

```js
const input = "hoge";

function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
f("test");
```

上記のように実装したら "Hello, test" と表示されるのではなく "Hello, hoge" と表示されるのではないかと予想したが、実際には test is not defined というエラーが出てしまった。

テキスト中の以下のコードを実行しても同様のエラーが発生した

```js
let scope = "global";
function constructFunction() {
  let scope = "local";
  return new Function("return scope"); // ローカルスコープを捕まえない。
}

// この行は"global"を返す。Function()コンストラクタから返される関数は、
// ローカルスコープを使わないため。
constructFunction()(); // => "global"
```

この実行結果は以下となるので、環境によってエラーが発生するのかもしれないが、理解できなかった

```
ReferenceError: scope is not defined
```
