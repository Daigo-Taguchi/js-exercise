export type DayOfWeek = "月" | "火" | "水" | "木" | "金" | "土" | "日";

const vacationDay = ["土", "日"];

export function isVacationWithIfElse(day: DayOfWeek): boolean | null {
  // return !vacationDay.includes(day) と 1行で書きたかったが、if-else を使うために冗長な書き方をしました。
  if (!vacationDay.includes(day)) {
    return true;
  } else {
    return false;
  }
}

export function isVacationWithSwitch(day: DayOfWeek): boolean | null {
  switch (day) {
    case "月":
      return true;
    case "火":
      return true;
    case "水":
      return true;
    case "木":
      return true;
    case "金":
      return true;
    case "土":
      return false;
    case "日":
      return false;
    default:
      return null;
  }
}
