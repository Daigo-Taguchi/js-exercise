interface GraphemeSegment {
  segment: string;
  index: number;
  input: string;
  isWordLike?: boolean;
}

export function reverseString(str: string) {
  const japaneseSegmenter = new Intl.Segmenter("ja-JP", {
    granularity: "grapheme",
  });
  const segments = [...japaneseSegmenter.segment(str)];
  const reverseSegments = segments.map((s) => s.segment).reverse();
  return reverseSegments.join("");
}

console.log("家族 👨‍👨‍👧‍👧");
console.log(reverseString("家族 👨‍👨‍👧‍👧"));
