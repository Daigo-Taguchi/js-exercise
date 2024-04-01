export function substring(str: string, indexStart: number, indexEnd?: number) {
  // NaN の場合と、0 より小さい数が入ってきた場合は 0 として扱う
  // -Infinity が入ってきた場合もここで 0 が入る (-Infinity < 0 は true)
  let start = Number.isNaN(indexStart) || indexStart < 0 ? 0 : indexStart;
  let end = Number.isNaN(indexEnd) ? 0 : indexEnd;

  // indexStart が有限の値かどうか確認して、無限なら str.length を入れる
  start = Number.isFinite(start) ? start : str.length;
  end = Number.isFinite(end) ? end : str.length;

  // indexEnd が未指定の場合は、末尾まで探索する
  if (end === undefined || end === null) {
    end = str.length;
  } else {
    // indexEnd が指定されたが、0より小さいときは 0 を入れる
    end = end < 0 ? 0 : end;

    // indexStart の値と indexEnd の値を比べて昇順に並び替える
    if (start > end) {
      const num = start;
      start = end;
      end = num;
    }
  }

  // 最後に小数だったら切り捨てる
  start = Math.floor(start);
  end = Math.floor(end);

  // 1文字ずつ探索して、文字列を作る
  let result = ``;
  for (let i = start; i < end; i++) {
    result += str.charAt(i);
  }
  return result;
}

// indexStart の位置から indexEnd の1つ手前までの文字列を返す
// indexStart が文字列の長さ以上の場合は空文字列を返す
// indexStart が省略、undefined、数値に変換できない、場合は 0 を入れる
// indexEnd が省略、undefined、数値に変換できない、str.length 以上なら末尾まで抽出、NaN の場合は 0 を入れる
// indexStart < 0, indexEnd < 0 の場合は、末尾から数えた場所になる
// 負の値を正規化した後で indexEnd <= indexStart の場合空文字列を返す
// 小数は切り捨てる
export function slice(
  str: string,
  indexStart?: number,
  indexEnd?: number
): string {
  // undefined, 数値に変換できない場合は 0 を入れる
  let start = indexStart && Number(indexStart) ? indexStart : 0;
  // undefined, 数値に変換できない場合は str.length を入れる
  let end = indexEnd && Number(indexEnd) ? indexEnd : str.length;

  // 小数だったら切り捨てる
  start = Math.floor(start);
  end = Math.floor(end);

  // indexEnd が NaN のときは 0 を入れる
  end = Number.isNaN(indexEnd) ? 0 : end;
  console.log(start, end);
  // indexStart が文字列の長さ以上の場合は空文字列を返す
  if (start >= str.length) {
    return "";
  }

  // indexEnd が文字列の長さより長い場合は文字列の末尾を返す
  end = end > str.length ? str.length : end;

  // index がマイナスの場合は末尾から取る
  // 末尾からとってもマイナスの場合は 0 にする
  start = start < 0 ? Math.max(start + str.length, 0) : start;
  end = end < 0 ? Math.max(end + str.length) : end;

  // 負の値の正規化の後、end <= start の場合は空文字列を返す
  if (end <= start) {
    return "";
  }

  console.log(start, end);

  // 1文字ずつ探索して、文字列を作る
  let result = ``;
  for (let i = start; i < end; i++) {
    result += str.charAt(i);
  }
  return result;
}

// export function padStart(str, targetLength, padString) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }

// export function trim(str) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }
