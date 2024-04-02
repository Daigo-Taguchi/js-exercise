class Human {
  private familyName;
  private givenName;
  private gender;

  constructor(
    familyName: string,
    givenName: string,
    gender: "male" | "female"
  ) {
    this.familyName = familyName;
    this.givenName = givenName;
    this.gender = gender;
  }
  valueOf() {
    // TODO
    return `gender is ${this.gender}`;
  }

  toString() {
    return `Hello! My name is ${this.givenName} ${this.familyName}`;
  }
}

let obj = new Human("Taguchi", "Daigo", "male");
console.log(obj.toString());
console.log(obj.valueOf());
