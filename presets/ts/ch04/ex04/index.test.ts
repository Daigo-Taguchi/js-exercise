import { bitCount } from "./index.ts";

describe("bitCount() test", () => {
  test("param = 0b111", () => {
    expect(bitCount(0b111)).toStrictEqual(3);
  });

  test("param = 0b1111111111111111111111111111111", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toStrictEqual(31);
  });
});
