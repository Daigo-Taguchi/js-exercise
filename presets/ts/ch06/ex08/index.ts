export interface Obj {
  [prop: string | number | symbol]: any;
}

export function restrict(target: Obj, template: Obj) {
  for (let p of Object.getOwnPropertyNames(target)) {
    if (template.hasOwnProperty(p)) {
      continue;
    }
    delete target[p];
  }
  return target;
}

export function substract(target: Obj, ...sources: Obj[]) {
  if (sources.length === 0) {
    return target;
  }

  for (let s of sources) {
    for (let p of Object.getOwnPropertyNames(s)) {
      if (!target[p]) {
        continue;
      }
      delete target[p];
    }
  }
  return target;
}
