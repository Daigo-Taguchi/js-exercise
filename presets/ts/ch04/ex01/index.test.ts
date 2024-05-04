import { add, div, mul, sub } from "./index.ts";

describe("add", () => {
  test.each([
    [1, 2, 2, 3, 3, 5],
    [1, -2, 2, 3, 3, 1],
    [1, 2, 2, -3, 3, -1],
  ])(
    "(%d + %d i) + (%d + %d i)",
    (real1, imaginary1, real2, imaginary2, expectReal, expectImaginary) => {
      expect(
        add(
          { real: real1, imaginary: imaginary1 },
          { real: real2, imaginary: imaginary2 }
        )
      ).toStrictEqual({
        real: expectReal,
        imaginary: expectImaginary,
      });
    }
  );
});

describe("sub", () => {
  test.each([
    [3, 2, 1, 1, 2, 1],
    [3, -2, 2, 1, 1, -3],
    [3, 2, 2, -1, 1, 3],
  ])(
    "(%d + %d i) - (%d + %d i)",
    (real1, imaginary1, real2, imaginary2, expectReal, expectImaginary) => {
      expect(
        sub(
          { real: real1, imaginary: imaginary1 },
          { real: real2, imaginary: imaginary2 }
        )
      ).toStrictEqual({
        real: expectReal,
        imaginary: expectImaginary,
      });
    }
  );
});

describe("mul", () => {
  test.each([
    [3, 2, 1, 1, 1, 5],
    [3, -2, 2, 1, 8, -1],
    [3, 2, 2, -1, 8, 1],
  ])(
    "(%d + %d i) * (%d + %d i)",
    (real1, imaginary1, real2, imaginary2, expectReal, expectImaginary) => {
      expect(
        mul(
          { real: real1, imaginary: imaginary1 },
          { real: real2, imaginary: imaginary2 }
        )
      ).toStrictEqual({
        real: expectReal,
        imaginary: expectImaginary,
      });
    }
  );
});

describe("div", () => {
  test.each([
    [3, 2, 1, 1, 2.5, -0.5],
    [3, -2, 2, 1, 0.8, -1.4],
    [3, 2, 2, -1, 0.8, 1.4],
  ])(
    "(%d + %d i) / (%d + %d i)",
    (real1, imaginary1, real2, imaginary2, expectReal, expectImaginary) => {
      expect(
        div(
          { real: real1, imaginary: imaginary1 },
          { real: real2, imaginary: imaginary2 }
        )
      ).toStrictEqual({
        real: expectReal,
        imaginary: expectImaginary,
      });
    }
  );
});
