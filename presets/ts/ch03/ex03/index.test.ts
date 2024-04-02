import { checkEqual } from "./index.ts";

it("(0.3 - 0.2, 0.1) is true", async () => {
  expect(checkEqual(0.3 - 0.2, 0.1)).toBe(true);
});

it("(0.2 - 0.1, 0.1) is true", async () => {
  expect(checkEqual(0.2 - 0.1, 0.1)).toBe(true);
});

it("(0.1, 0.3) is false", async () => {
  expect(checkEqual(0.1, 0.3)).toBe(false);
});

it("(0.3, 0.1) is false", async () => {
  expect(checkEqual(0.3, 0.1)).toBe(false);
});
