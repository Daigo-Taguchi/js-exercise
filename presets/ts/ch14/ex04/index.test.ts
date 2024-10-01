import { Hiragana } from "./index.ts";

describe("Hiragana test", () => {
  test("compare hiragana", () => {
    const h1 = new Hiragana("あ");
    const h2 = new Hiragana("い");
    const h3 = new Hiragana("う");

    expect(h1 < h2).toStrictEqual(true);
    expect(h2 < h3).toStrictEqual(true);
    expect(h1 > h3).toStrictEqual(false);
  });

  test("sort hiragana", () => {
    const hiraganas = [
      new Hiragana("か"),
      new Hiragana("み"),
      new Hiragana("そ"),
      new Hiragana("て"),
    ];

    hiraganas.sort((a, b) => (a < b ? -1 : 1));
    const sortedChars = hiraganas.map((h) => `${h}`);
    expect(sortedChars).toStrictEqual(["か", "そ", "て", "み"]);
  });

  test("return correct UTF-16 code unit", () => {
    const h = new Hiragana("あ");
    expect(+h).toStrictEqual("あ".charCodeAt(0));
  });

  test("return correct hiragana", () => {
    const h = new Hiragana("あ");
    expect(`${h}`).toStrictEqual("あ");
  });

  test("return correct hiragana when boolean", () => {
    const h1 = new Hiragana("あ");
    const h2 = new Hiragana("い");
    expect(h1 < h2).toStrictEqual(true);
  });
});
