## 1. ワードの調査

### 標準入力

ターミナルから入力を受け取る方法

https://qiita.com/saba_can00/items/02ff28a16a0d312a5259

windows では主に以下の方法を利用する

1. process.stdin を readline モジュールを利用して読む
2. process.stdinを for await...ofを利用して読む

### 標準出力

ターミナルに出力を表示する

console.log はデバック目的で利用されるが、process.stdout.write を利用することで、出力結果をターミナルに表示できる。
console.log も内部では process.stdout.write を呼び出しているので、実際にはターミナル上に出力を表示することができるが、利用の目的が違う

https://stackoverflow.com/questions/4976466/difference-between-process-stdout-write-and-console-log-in-node-js

### 標準エラー出力

エラーが起こった場合の出力を行う方法
process.stderr を利用してターミナル上にエラーを表示する

https://nodejs.org/api/process.html#processstderr

### リダイレクト

プログラムが生成する出力を通常の出力先から別の場所に変更すること
process.stdout は書き込み可能なストリームなので、他のストリームにリダイレクト可能

### パイプ

ストリーム処理において、あるストリームの内容を別のストリームに流し込む役割をするもの

https://qiita.com/suin/items/8bf63cd457d75b709530#%E3%83%91%E3%82%A4%E3%83%97%E3%81%A8%E3%81%AF%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%A0%E3%82%92%E6%A9%8B%E6%B8%A1%E3%81%97%E3%81%99%E3%82%8B%E5%9C%9F%E7%AE%A1%E3%81%AE%E3%81%93%E3%81%A8

## 2. 実験

### `node cat.mjs`

#### 予測

標準入力に入力した文字列が、そのままターミナルに出力される

#### 結果

```
PS C:\codes\js-exercise\presets\js\ch16\ex05> node cat.mjs
test
test
aaa
aaa
```

### `echo FOO | node cat.mjs`

#### 予想

FOO がターミナル上に表示される

```
PS C:\codes\js-exercise\presets\js\ch16\ex05> echo FOO | node cat.mjs
FOO
```

### `node cat.mjs > output.txt`

#### 予測

標準入力に入力した文字列が output.txt の中に出力される

#### 結果

```
PS C:\codes\js-exercise\presets\js\ch16\ex05> node cat.mjs > output.txt
hoge
fuga
```

output.txt 内に入力した文字列が出力された

### `node cat.mjs test.txt`

#### 予測

test.txt の中の文字列がターミナル上に表示される

#### 結果

```
PS C:\codes\js-exercise\presets\js\ch16\ex05> node cat.mjs test.txt
hello, world
```

### `node cat.mjs test.txt > output.txt`

#### 予測

test.txt の中の文字列が output.txt に出力される

#### 結果

予測どおりの結果となった

### `node cat.mjs invalid-file > output.txt`

#### 予測

output.txt 上にエラーの内容が出力される

#### 結果

ターミナル上にエラーが表示され、output.txt の中身は空になった

### `node cat.mjs invalid-file 2> error.txt`

#### 予測

error.txt 上にエラーの内容が出力される

#### 結果

予測どおりの結果となった
