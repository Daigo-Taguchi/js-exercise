export function toBigEndian(bytes: Uint32Array): Uint32Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  for (let i = 0; i < bytes.length; i++) {
    // 32 bit (4 byte) の配列なので、4 byte ずつ取ってきて並べ替える
    const int = view.getUint32(i * 4, true);
    // ビッグエンディアンに並び替える
    view.setUint32(i * 4, int, false);
  }
  return bytes;
}

export function toLittleEndian(bytes: Uint32Array): Uint32Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  for (let i = 0; i < bytes.length; i++) {
    // 32 bit (4 byte) の配列なので、4 byte ずつ取ってきて並べ替える
    const int = view.getUint32(i * 4, false);
    // リトルエンディアンに並び替える
    view.setUint32(i * 4, int, true);
  }
  return bytes;
}
