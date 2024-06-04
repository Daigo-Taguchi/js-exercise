export function pop(arr: any[]) {
  const result: any[] = [];
  arr.forEach((e, i) => {
    if (i !== arr.length - 1) {
      result.push(e);
    }
  });
  return result;
}

export function push(arr: any[], element: any) {
  const result: any[] = [];
  arr.forEach((e) => result.push(e));
  result.push(element);
  return result;
}

export function shift(arr: any[]) {
  const result: any[] = [];
  arr.forEach((e, i) => {
    if (i !== 0) {
      result.push(e);
    }
  });
  return result;
}

export function unshift(arr: any[], element: any) {
  const result: any[] = [];
  arr.forEach((e, i) => {
    if (i !== 0) {
      result.push(e);
    }
    result.push(element);
  });
  return result;
}

export function sort(
  arr: any[],
  callback: (value1: number, value2: number) => number
) {
  return [...arr].sort((a, b) => callback(a, b));
}
