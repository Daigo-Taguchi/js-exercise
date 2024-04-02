import { equalArrays } from "./index.ts";

it("false", () => {
  expect(equalArrays([{ x: "hoge" }], [{ x: "hoge" }])).toBe(false);
});

it("true", () => {
  expect(equalArrays([1, 2, 3], [1, 2, 3])).toBe(true);
});
