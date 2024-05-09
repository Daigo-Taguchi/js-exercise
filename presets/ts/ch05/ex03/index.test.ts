import {
  DayOfWeek,
  isVacationWithIfElse,
  isVacationWithSwitch,
} from "./index.ts";

describe("isVacationWithIfElse", () => {
  test.each([
    ["月", true],
    ["火", true],
    ["水", true],
    ["木", true],
    ["金", true],
    ["土", false],
    ["日", false],
  ])("%s", (param, exp) => {
    expect(isVacationWithIfElse(param as DayOfWeek)).toStrictEqual(exp);
  });
});

describe("isVacationWithSwitch", () => {
  test.each([
    ["月", true],
    ["火", true],
    ["水", true],
    ["木", true],
    ["金", true],
    ["土", false],
    ["日", false],
  ])("%s", (param, exp) => {
    expect(isVacationWithSwitch(param as DayOfWeek)).toStrictEqual(exp);
  });
});
