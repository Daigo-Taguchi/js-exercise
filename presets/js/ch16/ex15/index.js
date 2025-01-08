import threads from "worker_threads";
import { fileURLToPath } from "url";

let num = 0;

if (threads.isMainThread) {
  const __filename = fileURLToPath(import.meta.url);
  const worker = new threads.Worker(__filename);

  worker.on("online", () => {
    // メインスレッドで num をインクリメント
    for (let i = 0; i < 10_000_000; i++) {
      num++;
    }

    // サブスレッドからのメッセージを受け取り、num をインクリメント
    worker.on("message", (message) => {
      if (message === "increment") {
        num++;
      }
    });

    worker.on("exit", () => {
      console.log(num);
    });
  });
} else {
  // サブスレッドで num をインクリメントするメッセージを送信
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("increment");
  }
  threads.parentPort.postMessage("done");
}

// このようないわゆるメッセージパッシングによって排他制御処理相当を行う並行処理モデルを Actor モデルと呼ぶ
// https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%AF%E3%82%BF%E3%83%BC%E3%83%A2%E3%83%87%E3%83%AB
