export async function retryWithExponentialBackoff<T>(
  func: () => Promise<boolean>,
  maxRetry: number,
  callback: (param: boolean) => T
): Promise<T> {
  let count = 0;
  let waitTime = 1 * 1000;
  while (count <= maxRetry) {
    const result = await func();

    if (result) {
      return callback(true);
    }
    count++;

    await new Promise((resolve) => setTimeout(resolve, waitTime));
    waitTime = waitTime * 2;
  }
  return callback(false);
}
