export function sortJapanese(str: string[]) {
  const collator = new Intl.Collator("ja-JP", { sensitivity: "base" }).compare;
  str.sort(collator);
}

export function toJapaneseDateString(date: Date): string {
  return Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    year: "numeric",
    month: "short",
    day: "numeric",
    era: "short",
  }).format(date);
}

const name = ["た", "ぐ", "ち", "だ", "い", "ご"];
sortJapanese(name);
console.log(name);

console.log(toJapaneseDateString(new Date()));
