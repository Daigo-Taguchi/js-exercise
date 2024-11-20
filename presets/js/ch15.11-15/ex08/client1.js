import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3003");

// サーバーに対してメッセージを送信する
// 送信したメッセージに対して、もう一つの別のクライアントからメッセージが送られてきた時に、resolve
// 送信したあとに一定時間レスポンスがなければ reject
// ws の通信が閉じた場合も reject
function sendRequest(message) {
  return new Promise((resolve, reject) => {
    ws.on("message", (data) => {
      console.log("message イベント発火");
      resolve(data.toString());
      ws.close();
    });

    ws.on("error", () => {
      reject(new Error("Websocket connection error"));
    });

    ws.on("close", () => {
      reject(new Error("Websocket connection closed"));
    });

    setTimeout(() => {
      reject(new Error("request timeout"));
    }, 3000);

    ws.send(message);
  });
}

// ws が開通したときにここが動く
// 即座にサーバーに対してメッセージを送信して、レスポンスを待機する
ws.on("open", async () => {
  console.log("open イベント発火");
  const response = await sendRequest("Hello from client1");
  console.log("Response1:", response);
});
