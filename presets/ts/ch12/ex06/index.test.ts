import { walk } from "./index.ts";

test("walk test", () => {
  const gen = walk("./ch12/ex06/testFolder");

  expect(gen.next()).toStrictEqual({
    path: "ch12/ex06/testFolder/nestFolder",
    isDirectory: true,
  });
  expect(gen.next()).toStrictEqual({
    path: "ch12/ex06/testFolder/test.txt",
    isDirectory: false,
  });
});
