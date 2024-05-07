const obj = {
  hoge: {
    fuga: {
      piyo: "test",
    },
  },
};

console.log(obj.hoge.fuga.piyo);

with (obj.hoge) {
  console.log(fuga.piyo);
}
