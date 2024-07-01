/* eslint-disable */
class Animal {
  eat() {
    console.log("eat");
  }

  makeSound() {
    console.log("makeSound");
  }
}

class Dog {
  private animal;
  constructor() {
    this.animal = new Animal();
  }

  bite() {
    console.log("bite");
  }

  makeSound() {
    this.animal.makeSound();
  }
}

class Husky {
  private dog;
  constructor() {
    this.dog = new Dog();
  }
}

class Cat {
  private animal;
  constructor() {
    this.animal = new Animal();
  }

  scratch() {
    console.log("scratch");
  }

  makeSound() {
    this.animal.makeSound();
  }
}

class Bird {
  private animal;
  constructor() {
    this.animal = new Animal();
  }

  swim() {
    console.log("swim");
  }

  makeSound() {
    this.animal.makeSound();
  }
}

class Fish {
  private animal;
  constructor() {
    this.animal = new Animal();
  }
}
