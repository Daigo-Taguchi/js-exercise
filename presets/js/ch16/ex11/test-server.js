import net from "net";

const server = net.createServer((socket) => {
  console.log("New client connected");

  // クライアントからのデータを受け取る
  socket.on("data", (data) => {
    console.log("Received data:", data.toString());
  });

  // 接続が閉じられたときの処理
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  // 接続を維持するため、何も送信しない
  socket.write("Connected to server\n");
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
