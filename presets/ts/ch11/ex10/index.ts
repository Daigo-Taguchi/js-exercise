type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * 引数で指定した年月の日数を返す
 * @param year
 * @param month
 * @returns
 */
export function getDays(year: number, month: Month): number {
  // Date コンストラクタに指定する month は 引数の month - 1 になるので、先月の Date オブジェクトになる
  const date = new Date(year, month);
  // setDate の仕様で、0 を渡すと先月の月末を指す
  date.setDate(0);

  return date.getDate();
}

/**
 * 開始日から終了日までの日数(開始日と終了日を含む) を計算する
 * 引数は SimpleDate で受け取る
 * @param startDate
 * @param endDate
 * @returns
 */
export function getDaysDifference(startDate: string, endDate: string): number {
  if (!(isSimpleDate(startDate) && isSimpleDate(endDate))) {
    throw new Error("invalid date format");
  }

  const sd = simpleDateToDate(startDate);
  const ed = simpleDateToDate(endDate);

  // 時間の差を ms で算出
  const diff = ed.getTime() - sd.getTime();

  // 時間の差を日数に変換(切り捨て)
  const term = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
  console.log(`日数: ${term}`);

  // 週の数
  const weeks = Math.floor(term / 7);
  console.log(`週数: ${weeks}`);

  // 余った日にち
  const remainder = term % 7;

  const dayOffs = [0, 6];
  if (remainder === 0) {
    return term - weeks * dayOffs.length;
  } else {
    let remainderDayOffCount = 0;

    // 開始日の曜日を取得して
    // 余りの日にちを1日ずつ足して、その曜日が土日であればその日数をカウント
    for (let i = 0; i < remainder; i++) {
      if (dayOffs.includes((sd.getDay() + i) % 7)) {
        remainderDayOffCount++;
      }
    }
    // 開始日と終了日の差分から、土日の日数を引く
    // そこから、余りの日数のうち土日の日数分をさらに引く
    console.log(`余りの土日: ${remainderDayOffCount}`);
    return term - weeks * dayOffs.length - remainderDayOffCount;
  }
}

export function getWeekDayWithLocale(dateString: string, locale: string) {
  if (!isSimpleDate(dateString)) {
    throw new Error("invalid date format");
  }

  const date = simpleDateToDate(dateString);

  return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
}

function isSimpleDate(date: string): boolean {
  const regex = /^\d{4}-\d{1,2}-\d{2}$/;
  return regex.test(date);
}

export function getLastMonth() {
  const now = new Date();
  console.log(now.toString());

  const month = now.toString().split(" ")[1];
  console.log(month);
}

function simpleDateToDate(date: string): Date {
  if (!isSimpleDate(date)) {
    throw new Error("invalid date format");
  }

  const year = Number(date.split("-")[0]);
  const month = Number(date.split("-")[1]);
  const day = Number(date.split("-")[2]);

  return new Date(year, month - 1, day);
}
