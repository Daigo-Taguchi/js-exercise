import { retryWithExponentialBackoff } from "./index.ts";

jest.setTimeout(100000);

test("初回の実行で成功", async () => {
  const func = jest.fn(() => Promise.resolve(true));
  const callback = jest.fn((result) => {
    expect(result).toBe(true);
    expect(func).toHaveBeenCalledTimes(1);
  });

  await retryWithExponentialBackoff(func, 3, callback);
});

test("2回目の実行で成功", async () => {
  const func = jest
    .fn()
    .mockResolvedValueOnce(false)
    .mockResolvedValueOnce(true);

  const callback = jest.fn((result) => {
    expect(result).toBe(true);
    expect(func).toHaveBeenCalledTimes(2);
  });

  await retryWithExponentialBackoff(func, 3, callback);
});

test("最大リトライ回数で失敗", async () => {
  const func = jest.fn(() => Promise.resolve(false));
  const callback = jest.fn((result) => {
    expect(result).toBe(false);
    expect(func).toHaveBeenCalledTimes(4); // 1回目 + 最大リトライ数
  });

  await retryWithExponentialBackoff(func, 3, callback);
});
