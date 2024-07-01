import { BattleMage, BattleMage2, Warrior, Warrior2 } from "./index.ts";

describe("RPG test with class", () => {
  test("Warrior's attack is valid", () => {
    const warrior = new Warrior(10);
    expect(warrior.attack()).toStrictEqual(20);
  });

  test("BattleMage's attack is valid", () => {
    const battleMage = new BattleMage(10, 5);
    expect(battleMage.attack()).toStrictEqual(25);
  });
});

/* eslint-disable */
describe("RPG test with prototype", () => {
  test("Warrior's attack is valid", () => {
    const warrior2 = new (Warrior2 as any)(10);
    expect(warrior2.attack()).toStrictEqual(20);
  });

  test("BattleMage's attack is valid", () => {
    const battleMage = new (BattleMage2 as any)(10, 5);
    expect(battleMage.attack()).toStrictEqual(25);
  });
});
