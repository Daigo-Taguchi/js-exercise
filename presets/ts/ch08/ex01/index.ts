// 1
// 引数の括弧はパラメータが2つ以上のため必要
// 戻り値の中括弧は return 文以外に console 出力の文が必要なため必須
export const f1 = (n: number, c: string) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    console.log(c);
    result.push(c);
  }
  return result;
};

// 2
// 引数が1つのみなので括弧は不要だが、ts で型を定義するので必要
// 戻り値の中括弧は return 文のみなので不要
export const f2 = (x: number) => x * x;

// 3
// 引数が0個の場合は括弧が必要
// 戻り値の値がオブジェクトなので、オブジェクトと戻り値を区別するために、戻り値を示す中括弧とオブジェクトを示す中括弧の2つが必須
export const f3 = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = hour + ":" + minute;

  return {
    now: time,
  };
};
