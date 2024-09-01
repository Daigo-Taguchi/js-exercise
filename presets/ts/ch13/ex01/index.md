## 予想

"Hello world!" の文字列が表示されない

## 理由

1000 ms 後に "Hello, world!" の文字列が表示されるようにタスクがキューに追加される。longRunningFunction の処理のタスクが実行されていて、そのあとに "Hello world!" のタスクが実行されるので、 "Hello, world!" の文字列が表示されない。
