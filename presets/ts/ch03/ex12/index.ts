interface NumObj {
  [key: string]: number;
}

const obj1: NumObj = { x: 1 };

obj1.y = 2;
console.log(obj1.y);

const obj2: NumObj = { x: 1, y: 2 };
console.log(obj1 === obj2);

export function equals(o1: NumObj, o2: NumObj) {
  for (const p1 in o1) {
    if (o1[p1] !== o2[p1]) {
      return false;
    }
  }

  for (const p2 in o2) {
    if (o1[p2] !== o2[p2]) {
      return false;
    }
  }
  return true;
}
