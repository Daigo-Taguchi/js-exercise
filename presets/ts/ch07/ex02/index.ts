function fizzbuzz(n: number) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const results = arr.map((x) =>
    x % 15 === 0 ? "FizzBuzz" : x % 5 === 0 ? "Fizz" : x % 3 === 0 ? "Buzz" : x
  );
  results.forEach((e) => console.log(e));
}

// function _fizzbuzz(n: number) {
//   for (let i = 1; i <= n; i++) {
//     if (i % 15 === 0) {
//       console.log("FizzBuzz");
//     } else if (i % 3 === 0) {
//       console.log("Fizz");
//     } else if (i % 5 === 0) {
//       console.log("Buzz");
//     } else {
//       console.log(i);
//     }
//   }
// }

// console.log(fizzbuzz(15) === _fizzbuzz(15));

function sumOfSquaredDifference(f: number[], g: number[]) {
  let result = 0;
  f.forEach((_, i) => (result += (f[i] - g[i]) ** 2));
  return result;
}

// function _sumOfSquaredDifference(f: number[], g: number[]) {
//   let result = 0;
//   for (let i = 0; i < f.length; i++) {
//     result += (f[i] - g[i]) ** 2;
//   }
//   return result;
// }

// console.log(
//   sumOfSquaredDifference([4, 5, 6], [1, 2, 3]) ===
//     _sumOfSquaredDifference([4, 5, 6], [1, 2, 3])
// );

function sumOfEvensIsLargerThan42(array: number[]) {
  let sum = 0;
  array.forEach((e) => {
    sum += e % 2 === 0 ? e : 0;
  });
  return sum >= 42;
}

// function _sumOfEvensIsLargerThan42(array: number[]) {
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] % 2 !== 0) {
//       continue;
//     }
//     sum += array[i];
//     if (sum >= 42) {
//       return true;
//     }
//   }
//   return false;
// }

// console.log(
//   sumOfEvensIsLargerThan42([40, 4]) === _sumOfEvensIsLargerThan42([40, 4])
// );
