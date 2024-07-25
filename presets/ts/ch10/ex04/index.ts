export function funcHoge() {
  console.log("hoge");
}

export class Hoge {
  printHoge() {
    console.log("print hoge");
  }
}

export default class Fuga {
  private str;
  constructor(str: string) {
    this.str = str;
  }

  print() {
    console.log(this.str);
  }
}

export { reExport2 as reExport, ReExport } from "./test.ts";
