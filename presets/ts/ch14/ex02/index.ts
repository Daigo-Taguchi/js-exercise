/* eslint-disable @typescript-eslint/no-explicit-any */
// MyArray で型エラーが発生して解決できない

// export class MyArrayLike {
//   private items: any[];

//   constructor(items: any[] = []) {
//     this.items = items;
//     items.forEach((item, index) => {
//       this[index] = item;
//     });
//   }

//   [index: number]: any;

//   get length(): number {
//     return this.items.length;
//   }
// }

// export class MyArray extends Array {
//   static get [Symbol.species]() {
//     return MyArrayLike;
//   }

//   constructor(items: any[]) {
//     super(...items);
//   }
// }
