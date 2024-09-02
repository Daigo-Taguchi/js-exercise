## 予想

Hello, world! を出力しようとするが、longRunningButAsyncFunction が終わらずに表示されない

## 結果

何も表示されない

## 理由

setTimeout で 1000ms 後に Hello, World! を出力するためのマイクロタスクをスケジュールする。
しかし、longRunningButAsyncFunction の中は await null で即座に解決される無限ループなので、即座にマイクロタスクのキューに入れられる。
つまり、longRunningButAsyncFunction のマイクロタスクのキューが常に更新されるので、他のタスクに移行できず、Hello, world! が表示されない
