import { f1, f2, f3 } from "./index.ts";

describe("アロー関数のテスト", () => {
  const mockDate = new Date(2024, 5, 23, 15, 30, 0);
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);

  test("f1", () => {
    expect(f1(3, "t")).toStrictEqual(["t", "t", "t"]);
  });

  test("f2", () => {
    expect(f2(2)).toStrictEqual(4);
  });

  test("f3", () => {
    expect(f3()).toStrictEqual({ now: "15:30" });
  });
});
