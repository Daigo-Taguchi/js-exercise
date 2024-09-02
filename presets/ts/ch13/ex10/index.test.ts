import { fetchSumOfFileSizes } from "./index.ts";

describe("fetchSumOfFileSizesTest", () => {
  test("valid case", async () => {
    const result = await fetchSumOfFileSizes(
      "./ch13/resources/testFolder/testFolder2"
    );
    expect(result).toStrictEqual(69);
  });
});
