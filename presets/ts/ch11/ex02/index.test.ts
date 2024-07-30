import { cache } from "./index.ts";

describe("cache test", () => {
  const slowFunction = (obj: { value: number }) => {
    for (let i = 0; i < 1e6; i++);
    return obj.value * 2;
  };

  const cachedFunction = cache(slowFunction);

  test("正しい値が返されるかのテスト", () => {
    const input = { value: 5 };
    expect(cachedFunction(input)).toStrictEqual(10);
    expect(cachedFunction({ value: 10 })).toStrictEqual(20);
  });

  test("キャッシュされているかを実行時間で確認", () => {
    const input = { value: 5 };

    // performance.now() でマイクロ秒精度で時間を出力できる
    const start = performance.now();
    cachedFunction(input);
    const firstResult = performance.now() - start;

    const start2 = performance.now();
    cachedFunction(input);
    const secondResult = performance.now() - start2;

    expect(secondResult).toBeLessThan(firstResult);
  });

  // GC がされてるかのテストの書き方が分からなかった
});
