export function matrixSum(matrix1: number[][], matrix2: number[][]) {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    if (matrix1.length !== matrix2.length) {
      throw new Error("matrix size varies");
    }

    const resultRow = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      if (matrix1[i].length !== matrix2[i].length) {
        throw new Error("matrix size varies");
      }
      resultRow.push(matrix1[i][j] + matrix2[i][j]);
    }
    result.push(resultRow);
  }
  return result;
}

export function matrixMultiplication(matrix1: number[][], matrix2: number[][]) {
  const rows1 = matrix1.length;
  const cols1 = matrix1[0].length;
  const rows2 = matrix2.length;
  const cols2 = matrix2[0].length;

  if (cols1 !== rows2) {
    throw new Error("matrix size varies");
  }

  const result = new Array(rows1);
  for (let i = 0; i < rows1; i++) {
    result[i] = new Array(cols2).fill(0);
  }

  for (let i = 0; i < rows1; i++) {
    for (let j = 0; j < cols2; j++) {
      for (let k = 0; k < cols1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }
  return result;
}
