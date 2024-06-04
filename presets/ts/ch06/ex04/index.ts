interface Obj {
  [prop: string]: any;
}

const obj: Obj = {};
Object.defineProperty(obj, "x", { value: 1, writable: false });
Object.defineProperty(obj, "y", { value: 2, enumerable: false });
Object.defineProperty(obj, "z", { value: 3, configurable: false });

// writable = false なのでプロパティの変更でエラーになる
// obj.x = 3;

// configurable = false なのでプロパティの削除でエラーになる
// delete obj.z;

// obj の中にプロパティ "y" は存在するので true
console.log(obj.hasOwnProperty("y"));

// enumerable = false なので列挙不可
console.log(obj.propertyIsEnumerable("y"));
