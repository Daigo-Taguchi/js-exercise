// バブルソートを利用して昇順に配列を並べ替える
export function bubbleSort<T>(
  arr: T[],
  compare: (lhs: T, rhs: T) => number = (lhs, rhs) => {
    return lhs < rhs ? -1 : lhs > rhs ? +1 : 0;
  }
) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      // 前後の数字が同じだったら入れ替えない
      if (compare(arr[j], arr[j + 1]) === 0) {
        continue;
      }
      // 後ろの数字が大きい場合も入れ替えない
      if (compare(arr[j], arr[j + 1]) < 0) {
        continue;
      } else {
        // 前後の要素の大きさを比較して、手前の要素のほうが大きければ、後ろと入れ替える
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  console.log(arr);
  return arr;
}
