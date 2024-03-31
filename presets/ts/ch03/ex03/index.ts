export function checkEqual(num1: number, num2: number): boolean {
  const x = num1 ** 11;
  const y = num2 ** 11;

  return Math.abs(x - y) < 10 ** -10;
}
