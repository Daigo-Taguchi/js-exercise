import { counterGen } from "./index.ts";

test("counterGen", () => {
  const iter = counterGen(10);
  expect(iter.next()).toStrictEqual({ value: 1, done: false });
  expect(iter.next()).toStrictEqual({ value: 2, done: false });
  expect(iter.next()).toStrictEqual({ value: 3, done: false });
  expect(iter.throw(new Error("error"))).toStrictEqual({
    value: 0,
    done: false,
  });
});
