import { readdir, stat } from "./index.ts";

describe("readdir", () => {
  test("valid case", () => {
    return expect(
      readdir("./ch13/resources/testFolder")
    ).resolves.toStrictEqual(["test1.txt", "test2.txt", "testFolder2"]);
  });

  test("error case", () => {
    return expect(
      // 存在しないフォルダ
      readdir("./ch13/resources/invalidFolder")
    ).rejects.toStrictEqual(expect.objectContaining({ code: "ENOENT" }));
  });
});

describe("stat", () => {
  test("valid case", () => {
    return expect(
      stat("./ch13/resources/testFolder/test1.txt")
    ).resolves.toStrictEqual(expect.objectContaining({ size: 3 }));
  });

  test("error case", () => {
    return expect(
      // 存在しないフォルダ
      stat("./ch13/resources/invalidFolder")
    ).rejects.toStrictEqual(expect.objectContaining({ code: "ENOENT" }));
  });
});
