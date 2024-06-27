export interface Obj {
  [prop: string | number | symbol]: any;
}

export const obj: Obj = {
  r: 2,
  theta: Math.PI / 4,

  get accessorProp() {
    return { x: Math.cos(this.theta), y: Math.sin(this.theta) };
  },

  set accessorProp({ x, y }) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new Error("error props is NaN");
    }
    this.r = Math.hypot(x, y);
    this.theta = Math.atan2(x, y);
  },
};
