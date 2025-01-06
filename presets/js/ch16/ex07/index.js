import { promises as fs } from "fs";

export async function checkEntry(path) {
  try {
    const stats = await fs.stat(path);
    if (stats.isFile()) {
      return "file";
    } else if (stats.isDirectory()) {
      return "directory";
    }
    return "unknown";
  } catch (error) {
    console.error(`Error checking path: ${path}`, error);
    throw error;
  }
}

async function test() {
  try {
    console.log(await checkEntry("./example.txt")); // 'file' など
    console.log(await checkEntry("./exampleDir")); // 'directory' など
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
