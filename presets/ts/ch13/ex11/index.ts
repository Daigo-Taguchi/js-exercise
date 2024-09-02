import { wait } from "../module.ts";

export async function retryWithExponentialBackoff<T>(
  func: () => Promise<T>,
  retry: number
): Promise<T> {
  let count = 0;
  let waitTime = 1000;

  while (count < retry) {
    try {
      return await func();
    } catch (err) {
      count++;
      if (count >= retry) {
        throw err;
      }
      await wait(waitTime);
      waitTime = waitTime * 2;
    }
  }
  throw new Error("Unexpected Error");
}
