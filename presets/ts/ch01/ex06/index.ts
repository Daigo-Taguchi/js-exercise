export function fib(num: number): number | null {
  if (!Number.isInteger(num)) {
    return null;
  }

  if (num < 0) {
    return null;
  }

  let result: number[] = [];
  for (let i = 0; i <= num; i++) {
    if (i === 0) {
      result[i] = 0;
    } else if (i === 1) {
      result[i] = 1;
    } else {
      result[i] = result[i - 2] + result[i - 1];
    }
  }
  return result[result.length - 1];
}
