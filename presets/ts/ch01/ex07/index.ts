export class Point {
  private x = 0;
  private y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
