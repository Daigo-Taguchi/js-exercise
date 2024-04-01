const symbol1 = Symbol("hoge");
const symbol2 = Symbol("hoge");

interface SymbolObj {
  [key: symbol]: string;
}
const obj: SymbolObj = {};
obj[symbol1] = "hoge";
obj[symbol2] = "fuga";

console.log(obj[symbol1]);
console.log(obj[symbol2]);

const symbol3: symbol = Symbol.for("test");
const symbol4: symbol = Symbol.for("test");

console.log(symbol3 === symbol4);
console.log(symbol3.toString());
console.log(Symbol.keyFor(symbol4));
