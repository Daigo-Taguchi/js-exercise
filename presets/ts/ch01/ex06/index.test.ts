import { fib } from "./index.ts";

describe("fib", () => {
  it("valid case when n = 5", () => {
    expect(fib(5)).toBe(5);
  });

  it("valid case when n = 75", () => {
    expect(fib(75)).toBe(2111485077978050);
  });

  it("invalid case when n is not integer (n = 3.14)", () => {
    expect(fib(3.14)).toBe(null);
  });

  it("invalid case when n < 0", () => {
    expect(fib(-1)).toBe(null);
  });
});
