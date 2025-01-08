import { parentPort, workerData } from "worker_threads";

const { imageData, width, height } = workerData;

// ガウシアンフィルタ (5x5 カーネル)
const kernel = [
  [1, 4, 7, 4, 1],
  [4, 16, 26, 16, 4],
  [7, 26, 41, 26, 7],
  [4, 16, 26, 16, 4],
  [1, 4, 7, 4, 1],
];
const kernelSum = kernel.flat().reduce((sum, value) => sum + value, 0);

const applyKernel = (x, y, data) => {
  let r = 0,
    g = 0,
    b = 0;

  for (let ky = 0; ky < 5; ky++) {
    for (let kx = 0; kx < 5; kx++) {
      const offsetX = x + kx - 2;
      const offsetY = y + ky - 2;

      if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
        const index = (offsetY * width + offsetX) * 4;
        const weight = kernel[ky][kx];
        r += data[index] * weight;
        g += data[index + 1] * weight;
        b += data[index + 2] * weight;
      }
    }
  }

  return [
    Math.round(r / kernelSum),
    Math.round(g / kernelSum),
    Math.round(b / kernelSum),
  ];
};

const outputData = new Uint8ClampedArray(imageData.length);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const index = (y * width + x) * 4;
    const [r, g, b] = applyKernel(x, y, imageData);
    outputData[index] = r;
    outputData[index + 1] = g;
    outputData[index + 2] = b;
    outputData[index + 3] = imageData[index + 3]; // アルファ値はそのまま
  }
}

// メインスレッドに結果を送信
parentPort.postMessage(outputData);
