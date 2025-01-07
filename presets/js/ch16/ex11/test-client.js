import net from "net";

// 複数のクライアントを作成
const clients = [];
const numberOfClients = 1000;

for (let i = 0; i < numberOfClients; i++) {
  const client = new net.Socket();

  client.connect(8080, "127.0.0.1", () => {
    console.log(`Client ${i + 1} connected`);
  });

  client.on("data", (data) => {
    console.log(`Client ${i + 1} received: ${data.toString()}`);
  });

  client.on("end", () => {
    console.log(`Client ${i + 1} disconnected`);
  });

  clients.push(client);
}
