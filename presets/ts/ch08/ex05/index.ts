interface Obj {
  [prop: string]: number;
}

export function sequenceToObject(...values: (string | number)[]): Obj {
  if (values.length % 2 !== 0) {
    throw new Error("values is invalid length");
  }

  const obj: Obj = {};
  let key = "";
  let value = 0;

  values.forEach((element, index) => {
    if (index % 2 == 0) {
      if (typeof element !== "string") {
        throw new Error("invalid type error");
      }
      key = element;
    } else {
      if (typeof element !== "number") {
        throw new Error("invalid type error");
      }
      value = element;
      obj[key] = value;
    }
  });
  return obj;
}
