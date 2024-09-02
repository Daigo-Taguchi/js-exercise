import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchSumOfFileSizes(
  path: string
): Promise<number | null> {
  // eslint-disable-next-line no-useless-catch
  try {
    const files = await fsPromises.readdir(path);
    const sizePromises = files.map(async (file) => {
      const filePath = join(path, file);
      const stats = await fsPromises.stat(filePath);
      return stats.size;
    });

    const sizes = await Promise.all(sizePromises);

    return sizes.reduce((total, size) => total + size, 0);
  } catch (err) {
    throw err;
  }
}
