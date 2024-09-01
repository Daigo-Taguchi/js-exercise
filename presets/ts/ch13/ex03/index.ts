import * as fs from "node:fs";

export function readdir(
  path: string | Buffer | URL,
  // eslint-disable-next-line
  options?: any
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // readdir の options の型が fs 側でオーバーロードされている関係上
    // 型定義がの解決が面倒なので any で一旦回避
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

export function stat(
  path: string | Buffer | URL,
  // eslint-disable-next-line
  options?: any
): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}

// readdir("./ch13/resources/testFolder").then((files) => console.log(files));
// stat("./ch13/resources/testFolder/test1.txt").then((stats) => console.log(stats));
