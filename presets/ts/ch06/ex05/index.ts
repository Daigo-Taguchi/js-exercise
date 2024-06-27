// ts だと存在しないプロパティをオブジェクトに追加しようとするとエラーが出るので
// interface を定義して回避する
interface Obj {
  [prop: string | number]: any;
}

const proto = {
  1: "hoge",
  2: "fuga", // オブジェクトと同名ではない数字のプロパティ
  text: "a",
  text2: "b", // オブジェクトと同名ではない文字列のプロパティ
  enumerable: "true", // 列挙可のプロパティ
};

// 列挙可プロパティと同名の列挙不可のプロパティ
Object.defineProperty(proto, "enumerable", {
  value: "false",
  enumerable: false,
});

const obj: Obj = Object.create(proto);

obj[1] = "piyo"; // プロトタイプと同名の数字のプロパティ
obj[3] = "piyopiyo"; // プロトタイプと同名ではない数字のプロパティ
obj.text = "aa"; // プロトタイプと同名の文字列のプロパティ
obj.text3 = "cc"; // プロトタイプと同名ではない文字列のプロパティ

for (let prop in obj) {
  console.log(prop);
}

// 実行結果
/*
1
3
text
text3
2
text2
*/
