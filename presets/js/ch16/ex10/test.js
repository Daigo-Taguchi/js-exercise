import fs from "fs";
import fetch from "node-fetch";

(async () => {
  // NOTE: file.txt の内容をアップロード
  const result = await fetch("http://localhost:8000/foo/bar/hello.txt", {
    method: "PUT",
    body: fs.createReadStream("file.txt"),
    duplex: "half",
  });
  console.log(await result.text());
})();
