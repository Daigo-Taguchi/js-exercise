import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3003");

ws.on("open", () => {
  console.log("Connected to server");
});

ws.on("message", (data) => {
  console.log("Received message:", data.toString());
  const dataObj = JSON.parse(data);

  ws.send(
    JSON.stringify({ id: dataObj.id, message: "Hello," + dataObj.message })
  ); // 2つ目のクライアントからメッセージ送信
});

ws.on("close", () => {
  console.log("Disconnected from server");
});
