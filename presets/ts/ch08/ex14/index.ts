export function any<T>(...functions: ((p: T) => boolean)[]) {
  return function (param: T) {
    return functions.some((f) => f(param) === true);
  };
}

export function catching<P, R1, R2>(f1: (p: P) => R1, f2: (e: unknown) => R2) {
  return function (param: P) {
    try {
      return f1(param);
    } catch (error) {
      return f2(error);
    }
  };
}
