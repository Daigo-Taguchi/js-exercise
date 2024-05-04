export function bitCount(num: number): number {
  let result = 0;
  while (num / 2) {
    if (num % 2 === 1) {
      result++;

      // 2 で割った結果の余りがある場合は、もとの数値から 1を引く
      // これをしないと2で割ったときの商が算出できない (小数になってしまう)
      num--;
    }
    num = num / 2;
  }
  return result;
}
