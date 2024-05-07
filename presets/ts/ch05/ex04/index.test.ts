import { FibonacciDoWhile, FibonacciFor, FibonacciWhile } from "./index.ts";

describe("fibonacci", () => {
  test("while", () => {
    expect(FibonacciWhile()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });

  test("do-while", () => {
    expect(FibonacciDoWhile()).toStrictEqual([
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55,
    ]);
  });

  test("for", () => {
    expect(FibonacciFor()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
