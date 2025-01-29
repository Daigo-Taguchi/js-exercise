// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, rows, cols) {
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

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let liveNeighbors = 0;

      // 現在探索中のセルの周囲8マスの状態を確認する
      neighbors.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        // グリッドの外に行かないように周囲のセルの状態を確認する
        if (newRow > 0 && newRow < rows && newCol > 0 && newCol < cols) {
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
