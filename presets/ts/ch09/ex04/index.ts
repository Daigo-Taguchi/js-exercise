// class を使った記法
export class Warrior {
  private atk: number;

  constructor(atk: number) {
    this.atk = atk;
  }

  attack(): number {
    return this.atk * 2;
  }
}

export class BattleMage extends Warrior {
  private mgc: number;

  constructor(atk: number, mgc: number) {
    super(atk);
    this.mgc = mgc;
  }

  attack(): number {
    return super.attack() + this.mgc;
  }
}

// prototype を使った記法

/* eslint-disable */
export function Warrior2(this: any, atk: number) {
  this.atk = atk;
}

Warrior2.prototype.attack = function () {
  return this.atk * 2;
};

export function BattleMage2(this: any, atk: number, mgc: number) {
  Warrior2.call(this, atk);
  this.mgc = mgc;
}

BattleMage2.prototype = Object.create(Warrior2.prototype);
BattleMage2.prototype.constructor = BattleMage2;

BattleMage2.prototype.attack = function () {
  return Warrior2.prototype.attack.call(this) + this.mgc;
};
