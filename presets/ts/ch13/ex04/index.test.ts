import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.ts";

describe("fetchFirstFileSizeTest", () => {
  test("valid case", () => {
    return expect(
      fetchFirstFileSize("./ch13/resources/testFolder")
    ).resolves.toStrictEqual(3);
  });

  test("folder is empty", () => {
    return expect(
      fetchFirstFileSize("./ch13/resources/emptyFolder")
    ).resolves.toStrictEqual(null);
  });

  test("invalid Folder", () => {
    return expect(
      // 存在しないフォルダ
      fetchFirstFileSize("./ch13/resources/invalidFolder")
    ).rejects.toStrictEqual(expect.objectContaining({ code: "ENOENT" }));
  });
});

describe("fetchSumOfFileSizesTest", () => {
  test("valid case", () => {
    return expect(
      fetchSumOfFileSizes("./ch13/resources/testFolder/testFolder2")
    ).resolves.toStrictEqual(69);
  });

  test("invalid Folder", () => {
    return expect(
      // 存在しないフォルダ
      fetchSumOfFileSizes("./ch13/resources/invalidFolder")
    ).rejects.toStrictEqual(expect.objectContaining({ code: "ENOENT" }));
  });
});
