// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function templateType(strings: TemplateStringsArray, ...values: any[]) {
  // タグ付きテンプレートリテラルでは、補完部分が values に格納されて、それ以外が分割されて strings に格納される
  // 補完部分はその型名を返し、それ以外はそのまま文字列を返すので
  // `Hello, ${name}!` のような文字列だと Hello string! と返したい
  return strings.reduce((result, str, i) => {
    const typeName = i < values.length ? typeof values[i] : "";
    return result + str + typeName;
  }, "");
}
