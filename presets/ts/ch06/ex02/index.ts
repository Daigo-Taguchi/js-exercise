const obj1 = { x: 1, y: 2 };
const obj2 = Object.create(obj1);

console.log(obj1);
console.log(Object.getPrototypeOf(obj2));
