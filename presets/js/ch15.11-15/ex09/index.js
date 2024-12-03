// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("./decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  // セルの周囲8方向 (上下左右と斜め) のセルの座標
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let liveNeighbors = 0;

      // 現在探索中のセルの周囲8マスの状態を確認する
      neighbors.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        // グリッドの外に行かないように周囲のセルの状態を確認する
        if (newRow > 0 && newRow < ROWS && newCol > 0 && newCol < COLS) {
          if (grid[newRow][newCol]) {
            liveNeighbors++;
          }
        }
      });

      // 現在探索中のセルが生きている場合
      if (grid[row][col]) {
        // 周囲のセルが1個以下のときは false
        // 周囲のセルが4つ以上のときは false
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = false;
        }
      } else {
        // 周囲のセルが3個のときは
        if (liveNeighbors === 3) {
          nextGrid[row][col] = true;
        }
      }
    }
  }
  return nextGrid;
}

const ws = new WebSocket("ws://localhost:3003");

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();

  ws.send(JSON.stringify({ type: "toggle", row, col }));
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
  grid = updateGrid(grid);
  renderGrid(grid);
  animationId = requestAnimationFrame(update);
}

ws.addEventListener("open", () => {
  console.log("open イベント発火");
});

startButton.addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "start" }));

  ws.addEventListener("message", (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "update") {
      grid = data.grid;
      update();
    }
  });

  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "pause" }));

  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);

ws.addEventListener("message", (m) => {
  console.log("message イベント発火");
  const res = JSON.parse(m.data);

  if (res.type === "update") {
    grid = res.grid;
    renderGrid(grid);
  }

  if (res.type === "pause") {
    // アニメーションが停止している場合は何もしない
    if (!animationId) {
      return;
    }
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  if (res.type === "start") {
    // 既にアニメーションが動いている場合は何もしない
    if (animationId) {
      return;
    }
    update();
  }
});
