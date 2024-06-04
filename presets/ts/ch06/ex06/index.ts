export interface Obj {
  [prop: string | number | symbol]: any;
}

export function getProps(obj: Obj) {
  // 独自プロパティ(列挙不可、Symbol 含む)の一覧を取得する
  const result = Reflect.ownKeys(obj);

  // 継承プロパティの一覧を取得して、result の末尾に追加する
  for (let prop in obj) {
    if (result.includes(prop)) {
      continue;
    }
    result.push(prop);
  }
  return result;
}
