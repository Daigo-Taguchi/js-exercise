import {
  getDays,
  getDaysDifference,
  getLastMonth,
  getWeekDayWithLocale,
} from "./index.ts";

describe("date test", () => {
  test("getDays", () => {
    expect(getDays(2023, 1)).toStrictEqual(31);
    expect(getDays(2023, 2)).toStrictEqual(28);
    expect(getDays(2023, 3)).toStrictEqual(31);
    expect(getDays(2023, 4)).toStrictEqual(30);
    expect(getDays(2023, 5)).toStrictEqual(31);
    expect(getDays(2023, 6)).toStrictEqual(30);
    expect(getDays(2023, 7)).toStrictEqual(31);
    expect(getDays(2023, 8)).toStrictEqual(31);
    expect(getDays(2023, 9)).toStrictEqual(30);
    expect(getDays(2023, 10)).toStrictEqual(31);
    expect(getDays(2023, 11)).toStrictEqual(30);
    expect(getDays(2023, 12)).toStrictEqual(31);

    // うるう年
    expect(getDays(2024, 2)).toStrictEqual(29);
  });

  test("getDaysDifference", () => {
    // 連続した2日
    expect(getDaysDifference("2024-07-01", "2024-07-02")).toStrictEqual(2);
    // 土日の連続した2日
    expect(getDaysDifference("2024-07-06", "2024-07-07")).toStrictEqual(0);
    // 1週間
    expect(getDaysDifference("2024-07-01", "2024-07-07")).toStrictEqual(5);
    // 1か月
    expect(getDaysDifference("2024-06-01", "2024-07-01")).toStrictEqual(21);
    // 1年
    expect(getDaysDifference("2022-07-01", "2023-06-30")).toStrictEqual(261);
    // 1年(うるう年)
    expect(getDaysDifference("2023-07-01", "2024-06-30")).toStrictEqual(260);
  });

  test("getWeekDayWithLocale", () => {
    expect(getWeekDayWithLocale("2024-07-01", "ja-JP")).toStrictEqual("月曜日");
    expect(getWeekDayWithLocale("2024-07-01", "en-US")).toStrictEqual("Monday");
  });

  test("getLastMonth", () => {
    const mockDate = new Date(2022, 3, 10);
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
    expect(getLastMonth()).toStrictEqual(new Date(2022, 2, 1));
  });
});
