/* eslint-disable */
interface Obj {
  [n: string]: number;
}

export function cache<F extends (...args: any[]) => any>(fnc: F): any {
  // WeakMap の key にこの JSON が含まれてるか確認することで、複数回呼び出されたかを確認する
  // WeakMap を使うことで、キャッシュが GC の対象にする
  const cache = new WeakMap();

  return (obj: Obj) => {
    if (cache.has(obj)) {
      const result = cache.get(obj);
      return result;
    }

    const result = fnc(obj);
    cache.set(obj, result);
    return result;
  };
}

export function slowFn(obj: Obj) {
  const primes = [];

  for (let num = 2; num <= obj.max; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(num);
    }
  }
  return primes;
}
