"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});

async function getMessageFromServer() {
  button.disabled = true;

  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const message = new EventSource("/message");

  message.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);

      // メッセージ内容を要素に追加
      messageElement.textContent = data.value;
      messageContainer.appendChild(messageElement);

      // 最終メッセージでストリームを閉じる
      if (data.done) {
        message.close();
        console.log("Stream closed by server.");

        button.disabled = false;
      }
    } catch (err) {
      console.error("Failed to process server message:", err);
      button.disabled = false;
    }
  });
}
