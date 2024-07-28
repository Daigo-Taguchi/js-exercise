import { TypedMap } from "./index.ts";

describe("typedMap test", () => {
  test("key: String", () => {
    const typedMap = new TypedMap();
    typedMap.set(String, "string");
    expect(typedMap.get(String)).toStrictEqual("string");
  });

  test("key: Number", () => {
    const typedMap = new TypedMap();
    typedMap.set(Number, 123);
    expect(typedMap.get(Number)).toStrictEqual(123);
  });

  test("key: Foo", () => {
    class Foo {}
    const typedMap = new TypedMap();
    typedMap.set(Foo, new Foo());
    expect(typedMap.get(Foo)).toStrictEqual(new Foo());
  });
});
