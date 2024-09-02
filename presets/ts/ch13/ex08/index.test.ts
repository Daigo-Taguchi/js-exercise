import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.ts";

describe("fetchFirstFileSizeTest", () => {
  test("valid case", async () => {
    const result = await fetchFirstFileSize("./ch13/resources/testFolder");
    expect(result).toStrictEqual(3);
  });

  test("folder is empty", async () => {
    const result = await fetchFirstFileSize("./ch13/resources/emptyFolder");
    expect(result).toStrictEqual(null);
  });
});

describe("fetchSumOfFileSizesTest", () => {
  test("valid case", async () => {
    const result = await fetchSumOfFileSizes(
      "./ch13/resources/testFolder/testFolder2"
    );
    expect(result).toStrictEqual(69);
  });
});
