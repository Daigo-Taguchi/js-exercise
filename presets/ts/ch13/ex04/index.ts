import * as fsPromises from "node:fs/promises";
import { join } from "path";

export function fetchFirstFileSize(path: string): Promise<number | null> {
  return fsPromises
    .readdir(path)
    .then((files) => {
      if (files.length === 0) {
        return null;
      }
      return fsPromises.stat(join(path, files[0]));
    })
    .then((stats) => {
      if (!stats) {
        return null;
      }
      return stats.size;
    })
    .catch((err) => {
      throw err;
    });
}

export function fetchSumOfFileSizes(path: string): Promise<number | null> {
  return fsPromises
    .readdir(path)
    .then((files) => {
      const sizePromises = files.map((file) => {
        const filePath = join(path, file);
        return fsPromises.stat(filePath).then((stats) => stats.size);
      });
      return Promise.all(sizePromises);
    })
    .then((sizes) => {
      return sizes.reduce((total, size) => total + size, 0);
    })
    .catch((err) => {
      throw err;
    });
}

// 動作確認

// fetchFirstFileSize("./ch13/resources/testFolder").then((size) => {
//   console.log("size is", size, "bytes");
// });

// fetchSumOfFileSizes("./ch13/resources/testFolder/testFolder2").then((total) =>
//   console.log(total)
// );
