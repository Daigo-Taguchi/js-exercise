const ws = new WebSocket("ws://localhost:3003");

// サーバーに対してメッセージを送信する
// 送信したメッセージに対して、もう一つの別のクライアントからメッセージが送られてきた時に、resolve
// 送信したあとに一定時間レスポンスがなければ reject
// ws の通信が閉じた場合も reject
function sendRequest(message, id) {
  return new Promise((resolve, reject) => {
    // json 構造で {id: ***, message: "hoge"} のようにサーバーに送信
    ws.send(JSON.stringify({ id, message }));

    ws.addEventListener("message", (m) => {
      // サーバーから返ってきたレスポンスの種類で、どのレスポンスか判断する
      console.log("message イベント発火", m);
      console.log(m.data);
      const res = JSON.parse(m.data);
      console.log(id);
      if (res.id !== id) {
        return;
      }
      resolve(res);
    });

    ws.addEventListener("error", () => {
      reject(new Error("Websocket connection error"));
    });

    ws.addEventListener("close", () => {
      reject(new Error("Websocket connection closed"));
    });

    setTimeout(() => {
      reject(new Error("request timeout"));
    }, 10000);
  });
}

// ws が開通したときにここが動く
// 即座にサーバーに対してメッセージを送信して、レスポンスを待機する
ws.addEventListener("open", async () => {
  console.log("open イベント発火");
});

// メッセージ送信ボタンのクリックイベント
document.getElementById("sendButton").addEventListener("click", async () => {
  const message1 = document.getElementById("message1").value;
  const message2 = document.getElementById("message2").value;
  const message3 = document.getElementById("message3").value;

  const requests = [];
  if (message1) {
    requests.push(
      sendRequest(message1, "message1")
        .then((response) => {
          document.getElementById("response1").textContent = response.message;
        })
        .catch((error) => {
          document.getElementById("response1").textContent = error.message;
        })
    );
  }

  if (message2) {
    requests.push(
      sendRequest(message2, "message2")
        .then((response) => {
          document.getElementById("response2").textContent = response.message;
        })
        .catch((error) => {
          document.getElementById("response2").textContent = error.message;
        })
    );
  }

  if (message3) {
    requests.push(
      sendRequest(message3, "message3")
        .then((response) => {
          document.getElementById("response3").textContent = response.message;
        })
        .catch((error) => {
          document.getElementById("response3").textContent = error.message;
        })
    );
  }

  // すべてのリクエストを並列で実行
  await Promise.all(requests);
  console.log("All requests have been processed.");
});
