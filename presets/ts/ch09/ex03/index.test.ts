import { C1, C2 } from "./index.ts";

test("private access test", () => {
  const c = new C1();
  expect(c.getX()).toStrictEqual(42);
});

test("closure test", () => {
  const c = new C2();
  expect(c.getX()).toStrictEqual(42);
});
