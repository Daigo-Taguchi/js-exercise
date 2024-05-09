interface EscapeMap {
  [key: string]: string;
}

const escapeMap: EscapeMap = {
  "\0": "\\0", // NULL 文字
  "\b": "\\b", // バックスペース
  "\t": "\\t", // 水平タブ
  "\n": "\\n", // 改行
  "\v": "\\v", // 垂直タブ
  "\f": "\\f", // 改頁
  "\r": "\\r", // 復帰
  '"': '\\"', // 二重引用符
  "'": "\\'", // アポストロフィー
};

export function convertESWithIfElse(str: string): string {
  return str
    .split("")
    .map((char) => {
      if (escapeMap[char]) {
        return escapeMap[char];
      } else {
        return char;
      }
    })
    .join("");
}

export function convertESWithSwitch(str: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    switch (char) {
      case "\0":
        result += "\\0";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\t":
        result += "\\t";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\v":
        result += "\\v";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\r":
        result += "\\r";
        break;
      case '"':
        result += '\\"';
        break;
      case "'":
        result += "\\'";
        break;
      default:
        result += char;
        break;
    }
  }
  return result;
}
