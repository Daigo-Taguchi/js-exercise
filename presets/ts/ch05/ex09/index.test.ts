import { parseJson } from "./index.ts";

describe("parseJson", () => {
  test("valid case", () => {
    expect(parseJson('{"name": "taguchi"}')).toStrictEqual({
      success: true,
      data: { name: "taguchi" },
    });
  });

  test("error case", () => {
    expect(parseJson('{"name": "taguchi"}invalid data')).toStrictEqual(
      expect.objectContaining({
        success: false,
      })
    );
  });
});
