import { any, catching } from "./index.ts";

describe("any function test", () => {
  test("valid case", () => {
    const isNonZero = any(
      (n: number) => n > 0,
      (n: number) => n < 0
    );

    expect(isNonZero(0)).toBeFalsy();
    expect(isNonZero(42)).toBeTruthy();
    expect(isNonZero(-0.5)).toBeTruthy();
  });
});

describe("catching function test", () => {
  test("valid case", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e instanceof Error ? e.toString() : "Unknown error" };
    });
    expect(safeJsonParse('{"a": 1}')).toStrictEqual({ a: 1 });
    expect(safeJsonParse("{Invalid Json}")).toStrictEqual({
      error: "SyntaxError: Unexpected token I in JSON at position 1",
    });
  });
});
