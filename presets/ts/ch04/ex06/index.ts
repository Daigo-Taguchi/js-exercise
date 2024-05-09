function resize(params: { maxWidth: number; maxHeight: number } | undefined) {
  let maxWidth = 600;
  let maxHeight = 480;

  maxWidth = params && params.maxWidth ? params.maxWidth : maxWidth;
  maxHeight = params && params.maxHeight ? params.maxHeight : maxHeight;

  console.log({ maxWidth, maxHeight });
}
