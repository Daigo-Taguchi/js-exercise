// 関数の引数を修正
const m = function (...arg: string[]) {
  console.log(arg[1]);
};
m("a", "b");

// 同じ関数をアロー関数に書き直し
const arrow = (...args: string[]) => {
  console.log(args[1]);
};
arrow("a", "b");
