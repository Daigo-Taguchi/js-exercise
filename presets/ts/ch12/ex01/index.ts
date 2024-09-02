function counterIter(max: number) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value: number) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e: Error) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max: number) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

// 実験
// イテレーターインターフェースの next() を直接呼んでみる
const iter1 = counterIter(4);
console.log(iter1.next());
console.log(iter1.next());
console.log(iter1.next());
// console.log(iter1.throw(new Error("error check"))); // error を明示的に throw して catch が呼ばれて終了する
console.log(iter1.next());
console.log(iter1.next()); // 5回目で反復が終了しているので、done に true が格納される

const iter2 = counterIter(5);
console.log(iter2.return(3)); // return を直接呼ぶと、value の値に3 が入り、done:true となる

// ジェネレーター関数によって生成されたオブジェクトが、イテレータインターフェースを満たしていることの確認
const iter3 = counterGen(4);
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
// console.log(iter3.throw(new Error("error"))); // error を明示的に throw して catch が呼ばれて終了する
console.log(iter3.next());
console.log(iter3.next()); // 反復が終了したので、finally が呼ばれる
