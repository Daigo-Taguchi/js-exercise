export class Hiragana {
  private char;
  private utf16Code;

  constructor(char: string) {
    if (!/^[\u3040-\u309F]$/.test(char)) {
      throw new Error("Input must be a single hiragana character.");
    }

    this.char = char;
    // 取得したひらがなの UTF-16 のコード単位を取得する
    this.utf16Code = char.charCodeAt(0);
  }

  [Symbol.toPrimitive](type: string) {
    if (type === "number") {
      return this.utf16Code;
    }
    return this.char;
  }
}

// 動作確認

// const h1 = new Hiragana("ま");
// const h2 = new Hiragana("さ");

// const hiraganas = [h1, h2, new Hiragana("あ")];
// hiraganas.sort((a, b) => (a < b ? -1 : 1));
// console.log(hiraganas);
// console.log("この文字は「" + h1 + "」です");
// console.log(h1 < h2);
