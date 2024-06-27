export function sum(arr?: number[]) {
  if (!arr) {
    return 0;
  }
  if (arr.length === 0) {
    return 0;
  }
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
}

export function join(arr?: any[], separator: any = ",") {
  if (!arr) {
    throw new Error("parameter is empty");
  }

  if (arr.length === 0) {
    return "";
  }

  return arr.reduce((acc, cv, index) => {
    if (index === 0) {
      return `${cv ?? ""}`;
    } else {
      return `${acc}${separator}${cv ?? ""}`;
    }
  }, "");
}

export function reverse(arr?: any[]) {
  if (!arr) {
    throw new Error("parameter is empty");
  }
  if (arr.length === 0) {
    return [];
  }

  const result: any[] = [];
  arr.reduce((_, cv) => result.unshift(cv), "");
  return result;
}

export function every(
  arr: any[],
  callback: (value: number, index: number, array: any[]) => boolean
) {
  return arr.reduce((acc, cv, index, array) => {
    if (!acc) {
      return false;
    }
    return callback(cv, index, array);
  }, true);
}

export function some(
  arr: any[],
  callback: (value: number, index: number, array: any[]) => boolean
) {
  return arr.reduce((acc, cv, index, array) => {
    if (acc) {
      return true;
    }
    return callback(cv, index, array);
  }, false);
}
