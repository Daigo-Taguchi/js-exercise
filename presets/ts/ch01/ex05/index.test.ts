// import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
import { abs, sum, factorial, fib } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe("sum", () => {
    it("returns the correct result when both are positive numbers", () => {
      expect(sum([1, 2])).toBe(3);
    });

    it("returns the correct result when both are negative numbers", () => {
      expect(sum([-1, -2])).toBe(-3);
    });

    it("returns the correct result when array length is 1", () => {
      expect(sum([1])).toBe(1);
    });

    it("returns the correct result for positive and negative numbers", () => {
      expect(sum([1, -2])).toBe(-1);
    });

    it("returns the correct result when params include 0", () => {
      expect(sum([1, 0])).toBe(1);
    });

    it("returns the correct result when result = 0", () => {
      expect(sum([1, -1])).toBe(0);
    });

    it("returns 0 when params is empty array", () => {
      expect(sum([])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("valid case when n is positive number (n > 0)", () => {
      expect(factorial(3)).toBe(6);
    });

    it("valid case when n is zero (n = 0)", () => {
      expect(factorial(0)).toBe(1);
    });

    it("invalid case when n is negative number (n = -1)", () => {
      expect(factorial(-1)).toBe(null);
    });

    it("invalid case when n is not integer (n = 3.14)", () => {
      expect(factorial(3.14)).toBe(null);
    });
  });

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
});
