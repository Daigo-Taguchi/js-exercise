import { templateType } from "./index.ts";

describe("template literal test", () => {
  test("valid case", () => {
    const name = "Bob";
    expect(templateType`${"A"}`).toStrictEqual("string");
    expect(templateType`${{ x: 1 }}`).toStrictEqual("object");
    expect(templateType`Hello ${name}!`).toStrictEqual("Hello string!");
  });
});
