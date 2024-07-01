import { TypedMap } from "./index.ts";

describe("TypedMap test", () => {
  test("valid case", () => {
    const map = new Map();
    map.set("hoge", 1);
    map.set("fuga", 2);

    const typedMap = new TypedMap("string", "number", map);
    typedMap.set("fizz", 3);
    expect(typedMap.get("fizz")).toStrictEqual(3);
  });
});
