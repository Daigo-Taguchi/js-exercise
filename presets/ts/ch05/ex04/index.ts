export function FibonacciWhile() {
  const result = [1, 1];
  let index = 2;
  while (result.length < 10) {
    result.push(result[index - 2] + result[index - 1]);
    index++;
  }
  return result;
}

export function FibonacciDoWhile() {
  const result = [1, 1];
  let index = 2;
  do {
    result.push(result[index - 2] + result[index - 1]);
    index++;
  } while (result.length < 10);
  return result;
}

export function FibonacciFor() {
  const result = [1, 1];
  for (let i = 2; i < 10; i++) {
    result.push(result[i - 2] + result[i - 1]);
  }
  return result;
}
