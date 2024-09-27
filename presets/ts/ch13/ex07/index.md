## h1

### 予想

3秒後に A が出力され、その2秒後に B が出力され、さらにその1秒後に C が出力される

### 結果

予想と同じ

### 理由

```
wait3
|------------|
             logA
             |-|
               wait2
                |--------|
                         logB
                         |-|
                           wait1
                           |----|
                                logC
```

## h2

### 予想

即座にエラー X のエラーメッセージが表示される

### 結果

予想と同じ

### 理由

エラー X が発生して、catch でエラーメッセージが表示される

## h3

### 予想

即座にエラー X のエラーメッセージが表示される

### 結果

エラーX がハンドリングされないまま発生

### 理由

async 関数内でエラー X がスローされて、async 関数が返す Promise は reject される
しかし、new Promise のコンストラクターで async 関数を使っても resolve または reject を明示的に呼び出さないと、その Promise の結果を適切に制御できないので、errX の例外がキャッチされずに未処理のエラーとなる

## h4

### 予想

p1 のエラーがキャッチされてエラーメッセージが表示されて、p2 は実行すらされない

### 結果

エラーY のみ発生する

### 理由

わからない