import { sequenceToObject } from "./index.ts";

test("valid case", () => {
  expect(sequenceToObject("a", 1, "b", 2)).toStrictEqual({ a: 1, b: 2 });
});

test("error case with params length is 1", () => {
  expect(() => sequenceToObject("a")).toThrow("values is invalid length");
});

test("error case with params is invalid type", () => {
  expect(() => sequenceToObject(1, 1, "b", 2)).toThrow("invalid type error");
});
