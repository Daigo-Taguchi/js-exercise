import { restrict, substract } from "./index.ts";

describe("restrict()", () => {
  test("valid case", () => {
    const target = { x: 1, y: 2, z: 3, a: 4 };

    const template = { x: 1, y: 2 };
    Object.defineProperty(template, "a", {
      value: 4,
      enumerable: false,
    });

    const result = restrict(target, template);
    expect(result).toStrictEqual({ x: 1, y: 2, a: 4 });
  });
});

describe("substract()", () => {
  test("valid case", () => {
    const target = { x: 1, y: 2, z: 3, a: 4 };
    const source1 = { x: 1 };
    const source2 = { y: 2 };
    Object.defineProperty(source2, "a", {
      value: 4,
      enumerable: false,
    });
    expect(substract(target, source1, source2)).toStrictEqual({ z: 3 });
  });
});
