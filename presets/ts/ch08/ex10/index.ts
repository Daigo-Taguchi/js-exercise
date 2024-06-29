/* eslint-disable */

export interface MyFunction {
  (...args: any[]): any;
  myCall?: (context: { a: number }, ...args: any[]) => any;
}

export function addMyCall(f: MyFunction): void {
  f.myCall = function (context: { a: number }, ...args: any[]) {
    return f.bind(context)(...args);
  };
}
