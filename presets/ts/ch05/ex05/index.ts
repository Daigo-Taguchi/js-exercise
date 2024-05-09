type NumberObj = {
  [key: string]: number;
};

export function getEvenNumberObj(params: NumberObj): NumberObj {
  let result: NumberObj = {};
  for (let p in params) {
    if (!(params[p] % 2)) {
      result[p] = params[p];
    }
  }
  return result;
}
