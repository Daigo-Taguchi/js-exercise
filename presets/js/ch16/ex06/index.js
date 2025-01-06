import fs from "fs";

async function expandFile(filePath, newSize) {
  try {
    // ファイルの現在のサイズを取得
    const stats = await fs.promises.stat(filePath);
    const currentSize = stats.size;

    if (newSize < currentSize) {
      console.log(
        `Error: New size (${newSize}) is smaller than the current size (${currentSize}).`
      );
      return;
    }

    // `fs.truncate()` を使用してファイルを新しいサイズに拡張
    await fs.promises.truncate(filePath, newSize);

    console.log(`File expanded to ${newSize} bytes.`);
  } catch (error) {
    console.error(`Error expanding file: ${error.message}`);
  }
}

const newSize = 1024;

expandFile("example.txt", newSize);
