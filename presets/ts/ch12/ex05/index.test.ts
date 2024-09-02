import { readLines } from "./index.ts";

test("readLines test", () => {
  const gen = readLines("./ch12/ex05/testFile.txt");
  expect(gen.next().value).toStrictEqual("1行目の文字");
  expect(gen.next().value).toStrictEqual("2行目の文字");
  expect(gen.next().value).toStrictEqual("3行目の文字");
  expect(gen.next().value).toStrictEqual("4行目の文字");
});
