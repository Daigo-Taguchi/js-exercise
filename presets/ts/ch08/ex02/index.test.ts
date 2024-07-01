import { exponentiation1, exponentiation2 } from "./index.ts";

describe("recursive function", () => {
  test("valid case", () => {
    expect(exponentiation1(2, 10)).toStrictEqual(1024);
  });

  test("n = 0", () => {
    expect(exponentiation1(2, 0)).toStrictEqual(1);
  });

  test("x = 0", () => {
    expect(exponentiation1(0, 10)).toStrictEqual(0);
  });
});

describe("loop function", () => {
  test("valid case", () => {
    expect(exponentiation2(2, 10)).toStrictEqual(1024);
  });

  test("n = 0", () => {
    expect(exponentiation2(2, 0)).toStrictEqual(1);
  });

  test("x = 0", () => {
    expect(exponentiation2(0, 10)).toStrictEqual(0);
  });
});
