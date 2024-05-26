import { Obj, getProps } from "./index.ts";

describe("getProps", () => {
  test("プロパティの列挙", () => {
    // 継承プロパティ
    const proto: Obj = { a: "hoge", 1: "fuga" };
    // 列挙不可のプロパティ
    Object.defineProperty(proto, "enumerable", {
      value: "false",
      enumerable: false,
    });

    // 出力対象のプロパティ
    const obj: Obj = Object.create(proto);
    // 列挙不可のプロパティ
    Object.defineProperty(obj, "name", {
      value: "taguchi",
      enumerable: false,
    });

    // 文字列のプロパティ
    obj.x = "a";
    // 数字のプロパティ
    obj[2] = "hogehoge";
    // Symbol のプロパティ
    const symName = Symbol("propName");
    obj[symName] = "piyo";

    expect(getProps(obj)).toStrictEqual(["2", "name", "x", symName, "1", "a"]);
  });
});
