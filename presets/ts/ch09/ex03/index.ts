export class C1 {
  private x = 42;

  getX() {
    return this.x;
  }
}

export class C2 {
  private _getX: () => number;

  constructor() {
    const x = 42;
    this._getX = () => x;
  }

  getX() {
    return this._getX();
  }
}
