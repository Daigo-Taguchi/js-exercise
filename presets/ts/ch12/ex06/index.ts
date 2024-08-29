import fs from "fs";
import path from "path";

interface FileObj {
  path: string;
  isDirectory: boolean;
}

export function* walk(rootPath: string): Generator<FileObj> {
  try {
    const files = fs.readdirSync(rootPath);
    for (const file of files) {
      const entryPath = path.join(rootPath, file);
      const stats = fs.statSync(entryPath);
      yield { path: entryPath, isDirectory: stats.isDirectory() };
    }
  } catch (e) {
    throw new Error("rootPath is not Folder");
  }
}

// for (const w of walk("./ch12/ex06/testFolder")) {
//   console.log(w);
// }
// const gen = walk("./ch12/ex06/testFolder");
// console.log(gen.next());
