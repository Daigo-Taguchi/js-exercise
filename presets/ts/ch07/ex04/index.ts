const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 1
let mathSum = 0;
data.forEach((value) => (mathSum += value.math));
console.log("math の全員の合計点:" + mathSum);

// 2
const dataA = data.filter((value) => value.class === "A");
let chemistrySumA = 0;
dataA.forEach((value) => (chemistrySumA += value.chemistry));
console.log("クラスAの`chemistry`の平均点:" + chemistrySumA / dataA.length);

// 3
const dataC = data.filter((value) => value.class === "C");
let sumC = 0;
dataC.forEach(
  (value) => (sumC += value.math + value.chemistry + value.geography)
);
console.log("3科目合計点のクラスC内での平均点:" + sumC / dataC.length);

// 4
let topScorer = "";
let topScore = 0;
data.forEach((v) => {
  const sum = v.math + v.chemistry + v.geography;
  if (topScore < sum) {
    topScore = sum;
    topScorer = v.name;
  }
});
console.log("3科目合計点が最も高い人の`name`:" + topScorer);

// 5
let geographyTotal = 0;
data.forEach((value) => (geographyTotal += value.geography));

let geographyAverage = geographyTotal / data.length;
let totalGeographyDeviationSquared = 0;
data.forEach(
  (v) =>
    (totalGeographyDeviationSquared += (v.geography - geographyAverage) ** 2)
);

let geographyDispersion = totalGeographyDeviationSquared / data.length;
console.log("全体の`geography`の標準偏差:" + Math.sqrt(geographyDispersion));
