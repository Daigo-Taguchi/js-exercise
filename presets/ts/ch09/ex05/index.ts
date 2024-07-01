export function instanceOf<T, P, R>(
  object: T,
  constructor: new (...args: P[]) => R
): boolean {
  // object 型以外が入ってきたら false を返す
  // typeof null は "object" が返るので、明示的にチェックする必要がある
  if (typeof object !== "object" || object === null) {
    return false;
  }

  //
  let prototype = Object.getPrototypeOf(object);
  while (prototype !== null) {
    if (prototype === constructor.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}
