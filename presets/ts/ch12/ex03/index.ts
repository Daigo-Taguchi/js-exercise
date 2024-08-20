export function* counterGen(max: number) {
  try {
    for (let c = 1; c < max; c++) {
      yield c;
    }
  } catch (e) {
    yield 0;
  }
}
