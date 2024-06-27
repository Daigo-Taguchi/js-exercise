// ts だと存在しないプロパティをオブジェクトに追加しようとするとエラーが出るので
// interface を定義して回避する
interface Obj {
  [prop: string]: any;
}

let o: Obj = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;

console.log(o.isPrototypeOf(p)); // o が p のプロトタイプチェーン上に存在する
console.log(o.isPrototypeOf(q)); // o が q のプロトタイプチェーン上に存在する
console.log(p.isPrototypeOf(q)); // p が q のプロトタイプチェーン上に存在する
console.log(p.isPrototypeOf(o)); // p は o のプロトタイプチェーン上に存在しない

console.log();

// Object はすべてのオブジェクトのプロトタイプチェーンに存在する
console.log(Object.prototype.isPrototypeOf(Array));
console.log(Object.prototype.isPrototypeOf(Date));
console.log(Object.prototype.isPrototypeOf(Map));

console.log();

console.log(Array.prototype.isPrototypeOf(Object));
console.log(Array.prototype.isPrototypeOf(Date));
console.log(Array.prototype.isPrototypeOf(Map));

console.log();

console.log(Date.prototype.isPrototypeOf(Object));
console.log(Date.prototype.isPrototypeOf(Array));
console.log(Date.prototype.isPrototypeOf(Map));

console.log();

console.log(Map.prototype.isPrototypeOf(Object));
console.log(Map.prototype.isPrototypeOf(Array));
console.log(Map.prototype.isPrototypeOf(Date));
