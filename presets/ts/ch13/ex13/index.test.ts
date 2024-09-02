import { FileObj, walk } from "./index.ts";

test("valid case", async () => {
  const result: FileObj[] = [];
  for await (const elem of walk("./ch13/resources/testFolder")) {
    result.push(elem);
  }
  const expected = [
    { path: "ch13\\resources\\testFolder\\test1.txt", isDirectory: false },
    { path: "ch13\\resources\\testFolder\\test2.txt", isDirectory: false },
    { path: "ch13\\resources\\testFolder\\testFolder2", isDirectory: true },
    {
      path: "ch13\\resources\\testFolder\\testFolder2\\test2-1.txt",
      isDirectory: false,
    },
    {
      path: "ch13\\resources\\testFolder\\testFolder2\\test2-2.txt",
      isDirectory: false,
    },
  ];

  expect(result).toStrictEqual(expected);
});
