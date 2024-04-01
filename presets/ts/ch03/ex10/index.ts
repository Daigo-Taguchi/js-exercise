interface Human {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  [key: string]: string | number;
}

const human: Human = {
  firstName: "John",
  lastName: "Smith",
  age: 30,
  gender: "male",
};

for (const property in human) {
  console.log(`${property}: ${human[property]}`);
}
