import { convertESWithIfElse, convertESWithSwitch } from "./index.ts";

describe("convertESWithIfElse", () => {
  test.each([
    ["NULL 文字", "\0", "\\0"],
    ["バックスペース", "\b", "\\b"],
    ["水平タブ", "\t", "\\t"],
    ["改行", "\n", "\\n"],
    ["復帰", "\r", "\\r"],
    ["二重引用符", '"', '\\"'],
    ["アポストロフィー", "'", "\\'"],
  ])("%s", (_, param, exp) => {
    expect(convertESWithIfElse(param)).toStrictEqual(exp);
  });
});

describe("convertESWithSwitch", () => {
  test.each([
    ["NULL 文字", "\0", "\\0"],
    ["バックスペース", "\b", "\\b"],
    ["水平タブ", "\t", "\\t"],
    ["改行", "\n", "\\n"],
    ["復帰", "\r", "\\r"],
    ["二重引用符", '"', '\\"'],
    ["アポストロフィー", "'", "\\'"],
  ])("%s", (_, param, exp) => {
    expect(convertESWithSwitch(param)).toStrictEqual(exp);
  });
});
