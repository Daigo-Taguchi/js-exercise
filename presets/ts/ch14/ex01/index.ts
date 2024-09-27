interface MyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function unwritableAndUnconfigurableObj() {
  const obj: { a?: number } = { a: 1 };
  Object.defineProperty(obj, "a", {
    writable: false,
    configurable: false,
  });
  return obj;
}

export function writableAndUnconfigurableObj() {
  const obj: { b?: number } = { b: 2 };
  Object.defineProperty(obj, "b", {
    configurable: false,
  });
  return obj;
}

export function nestedUnwritableObj() {
  const d: MyObject = { e: 3 };
  const c: MyObject = { d: d };
  const obj: MyObject = { c: c };
  Object.freeze(c);
  Object.freeze(d);
  Object.freeze(obj);
  return obj;
}
