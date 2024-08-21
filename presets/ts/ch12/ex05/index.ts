import * as fs from "fs";

export function* readLines(filePath: string) {
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);
  const fd = fs.openSync(filePath, "r");
  let leftOver = "";

  try {
    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) > 0) {
      const chunk = leftOver + buffer.toString("utf8", 0, bytesRead);
      console.log(`Chunk read: "${chunk}"`);

      const lines = chunk.split("\\n");
      console.log(`Lines split: ${lines.length} - ${lines}`);

      leftOver = lines.pop() || "";

      for (const line of lines) {
        yield line;
      }
    }

    if (leftOver) {
      yield leftOver;
    }
  } catch (e) {
    throw new Error("error");
  } finally {
    fs.closeSync(fd);
  }
}

// for (const line of readLines("./ch12/ex05/testFile.txt")) {
//   console.log(line);
// }
