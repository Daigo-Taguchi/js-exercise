function hoge() {
  console.log("hello world");
}

class Fuga {
  private str = "piyo";

  fnc() {
    console.log(this.str);
  }
}

module.exports = { hoge, Fuga };
