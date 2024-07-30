import { sortJapanese, toJapaneseDateString } from "./index.ts";

test("sortJapanese", () => {
  const testData = [
    "す",
    "き",
    "な",
    "く",
    "だ",
    "も",
    "の",
    "は",
    "り",
    "ん",
    "ご",
    "で",
    "す",
  ];
  sortJapanese(testData);
  expect(testData).toStrictEqual([
    "き",
    "く",
    "ご",
    "す",
    "す",
    "だ",
    "で",
    "な",
    "の",
    "は",
    "も",
    "り",
    "ん",
  ]);
});

test("toJapaneseDateString", () => {
  const mockDate = new Date(2024, 6, 10);
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
  expect(toJapaneseDateString(new Date())).toStrictEqual("令和6年7月10日");
});
