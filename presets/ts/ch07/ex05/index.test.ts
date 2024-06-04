import { pop, push, shift, sort } from "./index.ts";

describe("test ex 05", () => {
  test("pop", () => {
    const seq = [1, 2, 3, 4, 5];

    expect(pop(seq)).toStrictEqual([1, 2, 3, 4]);
    expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("push", () => {
    const seq = [1, 2, 3, 4, 5];

    expect(push(seq, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("shift", () => {
    const seq = [1, 2, 3, 4, 5];

    expect(shift(seq)).toStrictEqual([2, 3, 4, 5]);
    expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("sort", () => {
    const seq = [1, 2, 3, 4, 5];

    expect(sort(seq, (a, b) => b - a)).toStrictEqual([5, 4, 3, 2, 1]);
    expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
  });
});
