import { matrixMultiplication, matrixSum } from "./index.ts";

describe("matrix sum", () => {
  test("valid case", () => {
    const matrix1 = [
      [1, 2],
      [3, 4],
    ];
    const matrix2 = [
      [5, 6],
      [7, 8],
    ];
    expect(matrixSum(matrix1, matrix2)).toStrictEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  test("error case", () => {
    const matrix1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const matrix2 = [
      [5, 6],
      [7, 8],
    ];
    expect(() => matrixSum(matrix1, matrix2)).toThrow("matrix size varies");
  });
});

describe("matrix multiple", () => {
  test("valid case", () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const matrix2 = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];
    expect(matrixMultiplication(matrix1, matrix2)).toStrictEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  test("error case", () => {
    const matrix1 = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const matrix2 = [
      [5, 6],
      [7, 8],
      [9, 10],
    ];
    expect(() => matrixMultiplication(matrix1, matrix2)).toThrow(
      "matrix size varies"
    );
  });
});
