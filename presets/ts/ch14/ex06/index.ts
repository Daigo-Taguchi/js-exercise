/* eslint-disable @typescript-eslint/no-explicit-any */

export function createMethodTrackingProxy(target: any) {
  // 履歴管理用の配列
  const callHistory: { date: Date; methodName: string; param: any[] }[] = [];

  // ハンドラ
  const handler = {
    get(target: any, propKey: any, receiver: any) {
      const originMethod = target[propKey];

      // 引数に渡された target で呼び出されたプロパティが関数の場合
      // 履歴を残して、target が持つ関数を実行する
      if (typeof originMethod === "function") {
        return (...args: any[]) => {
          callHistory.push({
            date: new Date(),
            // 関数名が Symbol になる可能性があるので、string に変換
            methodName: String(propKey),
            param: args,
          });
          // apply で元の関数を実行することで this のバインドを保持する
          return originMethod.apply(this, args);
        };
      }
      // 関数じゃない場合は、Reflect APIを使ってプロパティの値を取得する
      return Reflect.get(target, propKey, receiver);
    },
  };
  const proxy = new Proxy(target, handler);
  return { proxy, callHistory };
}

// 動作確認

// const myObject = {
//   year: 10,
//   greet(name: string) {
//     return `Hello, ${name}!`;
//   },
// };

// const { proxy, callHistory } = createMethodTrackingProxy(myObject);
// console.log(proxy.greet("Alice"));
// console.log(callHistory);
// console.log(myObject.year + " years old");
