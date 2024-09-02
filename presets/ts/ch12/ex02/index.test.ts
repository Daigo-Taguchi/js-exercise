import { fibonacciSequence } from "./index.ts";

test("fibonacci", () => {
  const iter1 = fibonacciSequence();
  expect(iter1.next()).toStrictEqual({ value: 1, done: false });
  expect(iter1.next()).toStrictEqual({ value: 1, done: false });
  expect(iter1.next()).toStrictEqual({ value: 2, done: false });
  expect(iter1.next()).toStrictEqual({ value: 3, done: false });
  expect(iter1.next()).toStrictEqual({ value: 5, done: false });
  expect(iter1.next()).toStrictEqual({ value: 8, done: false });
  expect(iter1.next()).toStrictEqual({ value: 13, done: false });
  expect(iter1.next()).toStrictEqual({ value: 21, done: false });

  const iter2 = fibonacciSequence();
  for (let i = 0; i < 20; i++) {
    iter2.next();
  }
  expect(iter2.next()).toStrictEqual({ value: 10946, done: false });
});
