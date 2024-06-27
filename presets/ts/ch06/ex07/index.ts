export interface Obj {
  [prop: string | number | symbol]: any;
}

export function assign(target: Obj, ...objects: Obj[]) {
  if (!objects) {
    return target;
  }

  for (let obj of objects) {
    for (let key of Reflect.ownKeys(obj)) {
      // 独自プロパティじゃなければ次の処理に移る
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      target[key] = obj[key];
    }
  }
  console.log(target);
  return target;
}
