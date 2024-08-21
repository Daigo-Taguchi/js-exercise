// 引数に受け取ったイテレーターオブジェクト(iterable) を predicate の条件で filter にかける
// filter を通過した場合は、iterable の next を実行して1個進める
// filter の条件に合った値を返す
function* filter<T>(
  iterable: IterableIterator<T>,
  predicate: (param: T) => boolean
) {
  let v = iterable.next();
  for (;;) {
    if (v.done || predicate(v.value)) {
      yield v.value;
    }
    v = iterable.next();
  }
}

// 整数を 2 から順番に返す ジェネレーター関数
function* returnNum() {
  let n = 2;
  for (;;) {
    yield n;
    n++;
  }
}

// 素数を順番に返すジェネレーター関数
export function* primes() {
  // 計算済みの素数
  const primeNumbers: number[] = [];

  // 整数列を2から順番に探索
  // 整数を素数で割って、割り切れなければそれを素数として配列に追加して返却する
  // これを繰り返すことで無限に素数を返す
  for (;;) {
    const gen = filter(returnNum(), (n: number) => {
      // 最初の素数は 2 で確定なので、2 を素数配列に入れて true を返す
      if (primeNumbers.length === 0) {
        primeNumbers.push(2);
        return true;
      }
      // 3以上の整数に対して、現在判明している素数で順番に割る
      for (const pn of primeNumbers) {
        // 割ってみて、割り切れたら素数じゃないので false を返す
        if (n % pn === 0) {
          return false;
        }
      }
      // どの素数でも割り切れない場合は、素数なので素数配列に入れて true を返す
      primeNumbers.push(n);
      return true;
    });
    yield gen.next().value;
  }
}
