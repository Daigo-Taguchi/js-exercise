// メモ
// バイナリデータを扱う場合は、Uint8Array などの型付き配列の形式にすれば
// 先頭からバイトデータを参照して拡張子を確認できる
// しかし、パラメータに Arraybuffer 型を指定しているのは
// バイナリデータを扱う際の数値型を限定せずに、汎用的にモジュールを扱うため

// パラメータで Uint8Array 型などを指定してしまうと、関数内部で Uint8Array で処理すること前提となってしまう

type FileType = "PDF" | "ZIP" | "GIF" | "PNG" | "UNKNOWN";

export function detectFileType(bytes: ArrayBuffer): FileType {
  if (isPDF(bytes)) {
    return "PDF";
  }
  if (isZIP(bytes)) {
    return "ZIP";
  }
  if (isGIF(bytes)) {
    return "GIF";
  }
  if (isPNG(bytes)) {
    return "PNG";
  }
  return "UNKNOWN";
}

function isPDF(bytes: ArrayBuffer): boolean {
  const pdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
  const targetBytes = new Uint8Array(bytes);

  if (targetBytes.length < pdfBytes.length) {
    return false;
  }
  const headBuffer = targetBytes.slice(0, pdfBytes.length);
  return pdfBytes.every((e, i) => e === headBuffer[i]);
}

function isZIP(bytes: ArrayBuffer): boolean {
  const zipBytes = [
    [0x50, 0x4b, 0x03, 0x04],
    [0x50, 0x4b, 0x05, 0x06],
    [0x50, 0x4b, 0x07, 0x08],
  ];
  const targetBytes = new Uint8Array(bytes);

  if (targetBytes.length < zipBytes[0].length) {
    return false;
  }
  for (const zb of zipBytes) {
    const headBuffer = targetBytes.slice(0, zb.length);
    if (zb.every((e, i) => e === headBuffer[i])) {
      return true;
    }
  }
  return false;
}

function isGIF(bytes: ArrayBuffer): boolean {
  const gifBytes = [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
  ];
  const targetBytes = new Uint8Array(bytes);

  if (targetBytes.length < gifBytes[0].length) {
    return false;
  }
  for (const gb of gifBytes) {
    const headBuffer = targetBytes.slice(0, gb.length);
    if (gb.every((e, i) => e === headBuffer[i])) {
      return true;
    }
  }
  return false;
}

function isPNG(bytes: ArrayBuffer): boolean {
  const pngBytes = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  const targetBytes = new Uint8Array(bytes);

  if (targetBytes.length < pngBytes.length) {
    return false;
  }
  const headBuffer = targetBytes.slice(0, pngBytes.length);
  return pngBytes.every((e, i) => e === headBuffer[i]);
}
