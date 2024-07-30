export class FileOverSizeError extends Error {
  private path;
  private size;

  constructor(path: string, size: number) {
    super(`${path} : ${size} byte`);
    this.path = path;
    this.size = size;
  }

  get name() {
    return "File Over size Error";
  }
}
