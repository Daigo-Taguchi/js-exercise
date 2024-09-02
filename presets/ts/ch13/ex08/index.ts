import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path: string): Promise<number | null> {
  // eslint-disable-next-line no-useless-catch
  try {
    const files = await fsPromises.readdir(path);
    if (files.length === 0) {
      return null;
    }
    const stats = await fsPromises.stat(join(path, files[0]));
    if (!stats) {
      return null;
    }
    return stats.size;
  } catch (err) {
    throw err;
  }
}

export async function fetchSumOfFileSizes(
  path: string
): Promise<number | null> {
  // eslint-disable-next-line no-useless-catch
  try {
    const files = await fsPromises.readdir(path);
    let total = 0;
    for (const file of files) {
      const filePath = join(path, file);
      const stats = await fsPromises.stat(filePath);
      total += stats.size;
    }
    return total;
  } catch (err) {
    throw err;
  }
}
