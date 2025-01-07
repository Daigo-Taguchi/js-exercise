import net from "net";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const method = request.split(" ")[0];
    const path = request.split(" ")[1];

    if (method === "GET" && path === "/") {
      const html = `<!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>`;

      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html; charset=utf-8\r\n");
      socket.write("Content-Length: " + Buffer.byteLength(html) + "\r\n");
      socket.write("\r\n");
      socket.write(html);
    } else if (method === "POST" && path === "/greeting") {
      const body = request.split("\r\n\r\n")[1];
      const params = new URLSearchParams(body);
      const name = params.get("name");
      const greeting = params.get("greeting");
      const responseHtml = `<html>
          <body>
            <h1>Greeting</h1>
            <p>Hello, ${name}! Your greeting is: ${greeting}</p>
          </body>
        </html>`;

      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html; charset=UTF-8\r\n");
      socket.write(`Content-Length: ${Buffer.byteLength(responseHtml)}\r\n`);
      socket.write("\r\n");
      socket.write(responseHtml);
    } else {
      if (method === "GET" || method === "POST") {
        socket.write("HTTP/1.1 404 Not Found\r\n");
      } else {
        socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
      }
      socket.write("Content-Type: text/plain\r\n");
      socket.write("\r\n");
      socket.write("Not Found or Method Not Allowed");
    }

    socket.end();
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});

// テストはどのように書くか分からなかったです
