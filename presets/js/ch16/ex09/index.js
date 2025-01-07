import express from "express";
import path from "path";
import fs from "fs";

const app = express();

const rootDir = process.argv[2] || "/tmp";
const port = parseInt(process.argv[3], 10) || 8000;

// /test/mirror エンドポイントの実装
app.all("/test/mirror", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.status(200);

  // リクエスト情報をレスポンスに書き込む
  res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

  // リクエストヘッダを出力
  Object.entries(req.headers).forEach(([key, value]) => {
    res.write(`${key}: ${value}\r\n`);
  });

  // ヘッダーの末尾に空行を追加
  res.write("\r\n");

  // リクエストボディをそのままレスポンスにパイプする
  req.pipe(res);
});

// 静的ファイルの提供
app.use((req, res) => {
  const endpoint = req.path;

  // ルートディレクトリから絶対パスを作成
  let filename = path.resolve(rootDir, endpoint);
  filename = filename.replace(/\.\.\//g, ""); // ../ を禁止

  // 拡張子に基づいて Content-Type を設定
  const ext = path.extname(filename);
  let type = "";
  switch (ext) {
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

  fs.stat(filename, (err, stats) => {
    if (err || !stats.isFile()) {
      res.status(404).send("File not found");
    } else {
      res.setHeader("Content-Type", type);
      fs.createReadStream(filename).pipe(res);
    }
  });
});

app.listen(port, () => {
  console.log("Current working directory:", process.cwd());

  console.log(`Server is listening on port ${port}`);
  console.log(`Serving files from: ${rootDir}`);
});
