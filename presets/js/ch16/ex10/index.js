import http from "http";
import url from "url";
import fs from "fs";
import path from "path";

function serve(rootDirectory, port) {
  const server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);

  server.on("request", (request, response) => {
    const endpoint = url.parse(request.url).pathname;

    // /test/mirror エンドポイントへのリクエスト
    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");
      response.writeHead(200);
      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );
      const headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }
      response.write("\r\n");
      request.pipe(response);
    }
    // PUT メソッドでファイルアップロードを処理
    else if (request.method === "PUT") {
      let filename = endpoint.substring(1); // 最初の / を取り除く
      filename = filename.replace(/\.\.\//g, "");
      filename = path.resolve(rootDirectory, filename); // 絶対パスに変換

      // アップロードされたファイルを保存するストリーム
      const writeStream = fs.createWriteStream(filename);

      // リクエストボディをファイルに書き込む
      request.pipe(writeStream);

      writeStream.on("finish", () => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(200);
        response.end("File uploaded successfully");
      });

      writeStream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(500);
        response.end("Error writing file: " + err.message);
      });
    }
    // その他のリクエストはローカルファイルを提供
    else {
      let filename = endpoint.substring(1); // 最初の / を取り除く
      filename = filename.replace(/\.\.\//g, ""); // セキュリティのため、../ を除去
      filename = path.resolve(rootDirectory, filename);

      let type;
      switch (path.extname(filename)) {
        case ".html":
        case ".htm":
          type = "text/html";
          break;
        case ".js":
          type = "text/javascript";
          break;
        case ".css":
          type = "text/css";
          break;
        case ".png":
          type = "image/png";
          break;
        case ".txt":
          type = "text/plain";
          break;
        default:
          type = "application/octet-stream";
          break;
      }

      const stream = fs.createReadStream(filename);
      // const stream = fs.read(filename);
      stream.once("readable", () => {
        response.setHeader("Content-Type", type);
        response.writeHead(200);
        stream.pipe(response);
      });

      stream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(404);
        response.end(err.message);
      });
    }
  });
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
