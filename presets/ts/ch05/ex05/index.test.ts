import { getEvenNumberObj } from "./index.ts";

describe("getEvenNumberObj", () => {
  test("{a: 1, b: 2, c: 3}", () => {
    expect(getEvenNumberObj({ a: 1, b: 2, c: 3 })).toStrictEqual({ b: 2 });
  });

  test("{a: 1, b: 3, c: 5}", () => {
    expect(getEvenNumberObj({ a: 1, b: 3, c: 5 })).toStrictEqual({});
  });

  test("{a: 2, b: 4}", () => {
    expect(getEvenNumberObj({ a: 2, b: 4, c: 6 })).toStrictEqual({
      a: 2,
      b: 4,
      c: 6,
    });
  });
});
