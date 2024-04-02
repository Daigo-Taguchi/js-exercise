export function abs(x: number): number {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
}

export function sum(array: number[]) {
  // 引数に空配列が入ってきたら 0 を返す
  if (array.length === 0) {
    return 0;
  }

  let sum = 0;
  for (let x of array) {
    sum += x;
  }
  return sum;
}

export function factorial(n: number): number | null {
  // 引数に Int 以外が入ってきたら null を返す
  if (!Number.isInteger(n)) {
    return null;
  }

  // 引数の数値が 負の値の場合は null を返す
  if (n < 0) {
    return null;
  }

  let product = 1;
  while (n > 1) {
    product *= n;
    n--;
  }
  return product;
}
