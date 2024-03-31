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

export class Point {
  private x = 0;
  private y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
