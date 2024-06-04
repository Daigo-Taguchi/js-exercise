import { Obj, assign } from "./index.ts";

describe("assign()", () => {
  test("valid case", () => {
    const target = { x: 1 };
    const obj: Obj = { x: 2, y: 3, z: 4 };
    const symbol = Symbol("prop");
    obj[symbol] = "hoge";
    expect(assign(target, obj) === Object.assign(target, obj)).toBeTruthy();
  });
});
