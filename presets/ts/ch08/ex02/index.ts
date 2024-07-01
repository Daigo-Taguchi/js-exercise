export function exponentiation1(x: number, n: number): number {
  if (n < 0) {
    throw new Error("error");
  }

  if (n === 0) {
    return 1;
  }

  if (n === 1) {
    return x;
  }

  return x * exponentiation1(x, n - 1);
}

export function exponentiation2(x: number, n: number): number {
  if (n < 0) {
    throw new Error("error");
  }

  if (n === 0) {
    return 1;
  }

  if (n === 1) {
    return x;
  }

  let result = x;
  for (let i = 0; i < n - 1; i++) {
    result *= x;
  }
  return result;
}
