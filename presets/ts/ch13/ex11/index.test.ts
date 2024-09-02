import { retryWithExponentialBackoff } from "./index.ts";

describe("retryWithExponentialBackoff", () => {
  test("succeeded first try", async () => {
    const mockFunc = jest.fn().mockResolvedValue("success");
    const result = await retryWithExponentialBackoff(mockFunc, 3);

    expect(result).toStrictEqual("success");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test("succeeded second try", async () => {
    // 1回目は失敗を返して、2回目で成功の Promise を返す mock 関数
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("failure"))
      .mockResolvedValue("success");

    const result = await retryWithExponentialBackoff(mockFunc, 3);
    expect(result).toStrictEqual("success");
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  test("failure because max retry", async () => {
    const mockFunc = jest.fn().mockRejectedValue(new Error("failure"));

    const result = retryWithExponentialBackoff(mockFunc, 3);
    await expect(result).rejects.toThrow("failure");
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });
});
