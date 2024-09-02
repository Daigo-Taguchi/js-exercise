import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export interface FileObj {
  path: string;
  isDirectory: boolean;
}

export async function* walk(rootPath: string): AsyncGenerator<FileObj> {
  try {
    const files = await fsPromises.readdir(rootPath);
    for (const file of files) {
      const entryPath = join(rootPath, file);
      const stats = await fsPromises.stat(entryPath);
      yield { path: entryPath, isDirectory: stats.isDirectory() };

      if (stats.isDirectory()) {
        yield* walk(entryPath);
      }
    }
  } catch (err) {
    throw new Error("rootPath is not folder");
  }
}

// (async () => {
//   // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
//   for await (const elem of walk("./ch13/resources/testFolder")) {
//     console.log(elem);
//   }
// })();
