import iconv from "iconv-lite";
import fs from "fs";

(() => {
  const readableStream = fs
    .createReadStream("ex04/hello.txt")
    .pipe(iconv.decodeStream("Shift_JIS"));

  let data = "";
  readableStream.on("data", (chunk) => {
    data += chunk;
  });

  readableStream.on("end", () => {
    console.log(data);
  });

  readableStream.on("error", (err) => {
    console.error(err);
  });
})();
