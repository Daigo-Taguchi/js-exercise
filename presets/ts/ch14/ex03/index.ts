export class IgnoreAccentPattern {
  private pattern;
  constructor(input: string | RegExp) {
    if (input instanceof RegExp) {
      this.pattern = new RegExp(
        this.removeDiacritics(input.source),
        input.flags
      );
    } else {
      this.pattern = new RegExp(this.removeDiacritics(input), "g");
    }
  }

  [Symbol.search](target: string) {
    // target 自体も正規化して分解
    // その後に search で比較する
    const normalizedTarget = target
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const result = normalizedTarget.search(this.pattern);
    return result;
  }

  [Symbol.match](target: string) {
    // target 自体も正規化して分解
    // その後に match で比較する
    const normalizedTarget = target
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const result = normalizedTarget.match(this.pattern);
    return result;
  }

  private removeDiacritics(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
