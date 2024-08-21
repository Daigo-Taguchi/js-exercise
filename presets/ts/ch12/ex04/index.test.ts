import { primes } from "./index.ts";

test("primes test", () => {
  const gen = primes();

  expect(gen.next().value).toStrictEqual(2);
  expect(gen.next().value).toStrictEqual(3);
  expect(gen.next().value).toStrictEqual(5);
  expect(gen.next().value).toStrictEqual(7);
  expect(gen.next().value).toStrictEqual(11);
  expect(gen.next().value).toStrictEqual(13);
  expect(gen.next().value).toStrictEqual(17);
});

test("big primes test", () => {
  const gen = primes();

  for (let i = 0; i < 99; i++) {
    gen.next().value;
  }
  expect(gen.next().value).toStrictEqual(541);
});
