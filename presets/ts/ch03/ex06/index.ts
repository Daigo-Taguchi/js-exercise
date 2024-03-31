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

// export function slice(str, indexStart, indexEnd) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }

// export function padStart(str, targetLength, padString) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }

// export function trim(str) {
//   // TODO: ここを実装しなさい
//   return "TODO";
// }
