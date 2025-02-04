/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/renderGrid.js":
/*!****************************!*\
  !*** ./ex05/renderGrid.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
// grid を canvas に描画する
function renderGrid(grid, rows, cols, ctx, resolution) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}


/***/ }),

/***/ "./ex05/updateGrid.js":
/*!****************************!*\
  !*** ./ex05/updateGrid.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
// Life Game のルールに従ってセルを更新する
function updateGrid(grid, rows, cols) {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderGrid.js */ "./ex05/renderGrid.js");
/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateGrid.js */ "./ex05/updateGrid.js");



// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio('./decision1.mp3');

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener('click', function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ROWS, COLS, ctx, RESOLUTION);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
  grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_1__.updateGrid)(grid, ROWS, COLS);
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ROWS, COLS, ctx, RESOLUTION);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener('click', () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener('click', () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ROWS, COLS, ctx, RESOLUTION);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ087QUFDUCxvQkFBb0IsWUFBWTtBQUNoQyxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjZDO0FBQ0E7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMERBQVU7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMERBQVU7QUFDbkIsRUFBRSwwREFBVTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMERBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaDE3Ly4vZXgwNS9yZW5kZXJHcmlkLmpzIiwid2VicGFjazovL2NoMTcvLi9leDA1L3VwZGF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vY2gxNy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaDE3L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaDE3L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2gxNy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NoMTcvLi9leDA1L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGdyaWQg44KSIGNhbnZhcyDjgavmj4/nlLvjgZnjgotcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdyaWQoZ3JpZCwgcm93cywgY29scywgY3R4LCByZXNvbHV0aW9uKSB7XHJcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcclxuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBncmlkW3Jvd11bY29sXTtcclxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBjdHgucmVjdChjb2wgKiByZXNvbHV0aW9uLCByb3cgKiByZXNvbHV0aW9uLCByZXNvbHV0aW9uLCByZXNvbHV0aW9uKTtcclxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNlbGwgPyAnYmxhY2snIDogJ3doaXRlJztcclxuICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvLyBMaWZlIEdhbWUg44Gu44Or44O844Or44Gr5b6T44Gj44Gm44K744Or44KS5pu05paw44GZ44KLXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkKGdyaWQsIHJvd3MsIGNvbHMpIHtcclxuICAvLyDmlrDjgZfjgYTjgrDjg6rjg4Pjg4njgpLkvZzmiJBcclxuICBjb25zdCBuZXh0R3JpZCA9IGdyaWQubWFwKChhcnIpID0+IFsuLi5hcnJdKTtcclxuXHJcbiAgLy8g44K744Or44Gu5ZGo5ZuyOOaWueWQkSAo5LiK5LiL5bem5Y+z44Go5pac44KBKSDjga7jgrvjg6vjga7luqfmqJlcclxuICBjb25zdCBuZWlnaGJvcnMgPSBbXHJcbiAgICBbLTEsIC0xXSxcclxuICAgIFstMSwgMF0sXHJcbiAgICBbLTEsIDFdLFxyXG4gICAgWzAsIC0xXSxcclxuICAgIFswLCAxXSxcclxuICAgIFsxLCAtMV0sXHJcbiAgICBbMSwgMF0sXHJcbiAgICBbMSwgMV0sXHJcbiAgXTtcclxuXHJcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcclxuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XHJcbiAgICAgIC8vIOWRqOWbsuOBruOCu+ODq+OBrueUn+WtmOaVsOOCkuaVsOOBiOOBpiBuZXh0R3JpZFtyb3ddW2NvbF0g44GrIHRydWUgb3IgZmFsc2Ug44KS6Kit5a6a44GZ44KLICjlrp/oo4XjgZfjgabjga0pXHJcbiAgICAgIGxldCBsaXZlTmVpZ2hib3JzID0gMDtcclxuXHJcbiAgICAgIC8vIOePvuWcqOaOoue0ouS4reOBruOCu+ODq+OBruWRqOWbsjjjg57jgrnjga7nirbmhYvjgpLnorroqo3jgZnjgotcclxuICAgICAgbmVpZ2hib3JzLmZvckVhY2goKFtkeCwgZHldKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3Um93ID0gcm93ICsgZHg7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sID0gY29sICsgZHk7XHJcblxyXG4gICAgICAgIC8vIOOCsOODquODg+ODieOBruWkluOBq+ihjOOBi+OBquOBhOOCiOOBhuOBq+WRqOWbsuOBruOCu+ODq+OBrueKtuaFi+OCkueiuuiqjeOBmeOCi1xyXG4gICAgICAgIGlmIChuZXdSb3cgPiAwICYmIG5ld1JvdyA8IHJvd3MgJiYgbmV3Q29sID4gMCAmJiBuZXdDb2wgPCBjb2xzKSB7XHJcbiAgICAgICAgICBpZiAoZ3JpZFtuZXdSb3ddW25ld0NvbF0pIHtcclxuICAgICAgICAgICAgbGl2ZU5laWdoYm9ycysrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyDnj77lnKjmjqLntKLkuK3jga7jgrvjg6vjgYznlJ/jgY3jgabjgYTjgovloLTlkIhcclxuICAgICAgaWYgKGdyaWRbcm93XVtjb2xdKSB7XHJcbiAgICAgICAgLy8g5ZGo5Zuy44Gu44K744Or44GMMeWAi+S7peS4i+OBruOBqOOBjeOBryBmYWxzZVxyXG4gICAgICAgIC8vIOWRqOWbsuOBruOCu+ODq+OBjDTjgaTku6XkuIrjga7jgajjgY3jga8gZmFsc2VcclxuICAgICAgICBpZiAobGl2ZU5laWdoYm9ycyA8IDIgfHwgbGl2ZU5laWdoYm9ycyA+IDMpIHtcclxuICAgICAgICAgIG5leHRHcmlkW3Jvd11bY29sXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDlkajlm7Ljga7jgrvjg6vjgYwz5YCL44Gu44Go44GN44GvXHJcbiAgICAgICAgaWYgKGxpdmVOZWlnaGJvcnMgPT09IDMpIHtcclxuICAgICAgICAgIG5leHRHcmlkW3Jvd11bY29sXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBuZXh0R3JpZDtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tICcuL3JlbmRlckdyaWQuanMnO1xyXG5pbXBvcnQgeyB1cGRhdGVHcmlkIH0gZnJvbSAnLi91cGRhdGVHcmlkLmpzJztcclxuXHJcbi8vIDUwIHggNTAg44Gu55uk6Z2i44Go44GZ44KLXHJcbmNvbnN0IFJPV1MgPSA1MDtcclxuY29uc3QgQ09MUyA9IDUwO1xyXG4vLyAx44K744Or44Gu44K144Kk44K6XHJcbmNvbnN0IFJFU09MVVRJT04gPSAxMDtcclxuXHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY3JlZW4nKTtcclxuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Jyk7XHJcbmNvbnN0IHBhdXNlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhdXNlJyk7XHJcblxyXG5jYW52YXMud2lkdGggPSBST1dTICogUkVTT0xVVElPTjtcclxuY2FudmFzLmhlaWdodCA9IENPTFMgKiBSRVNPTFVUSU9OO1xyXG5cclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvamEvZG9jcy9XZWIvQVBJL1dpbmRvdy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUg44GM6L+U44GZIElEXHJcbmxldCBhbmltYXRpb25JZCA9IG51bGw7XHJcblxyXG4vLyBOT1RFOiBkb3dubG9hZCBmcm9tIGh0dHBzOi8vc291bmRlZmZlY3QtbGFiLmluZm8vc291bmQvYnV0dG9uL21wMy9kZWNpc2lvbjEubXAzXHJcbmNvbnN0IHNvdW5kID0gbmV3IEF1ZGlvKCcuL2RlY2lzaW9uMS5tcDMnKTtcclxuXHJcbi8vIOODqeOCpOODleOCsuODvOODoOOBruOCu+ODqyAodHJ1ZSBvciBmYWxzZSkg44KS44Op44Oz44OA44Og44Gr5Yid5pyf5YyW44GZ44KLXHJcbmxldCBncmlkID0gbmV3IEFycmF5KFJPV1MpXHJcbiAgLmZpbGwobnVsbClcclxuICAubWFwKCgpID0+XHJcbiAgICBuZXcgQXJyYXkoQ09MUykuZmlsbChudWxsKS5tYXAoKCkgPT4gISFNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSlcclxuICApO1xyXG5cclxuLy8gY2FudmFzIOOBjOOCr+ODquODg+OCr+OBleOCjOOBn+OBqOOBjeOBruWHpueQhiAo44K744Or44Gu5YCk44KS5Y+N6Lui44GZ44KLKVxyXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBwb3MgPSB7IHg6IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LCB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wIH07XHJcblxyXG4gIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IocG9zLnkgLyBSRVNPTFVUSU9OKTtcclxuICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKHBvcy54IC8gUkVTT0xVVElPTik7XHJcbiAgZ3JpZFtyb3ddW2NvbF0gPSAhZ3JpZFtyb3ddW2NvbF07XHJcbiAgc291bmQuY2xvbmVOb2RlKCkucGxheSgpO1xyXG4gIHJlbmRlckdyaWQoZ3JpZCwgUk9XUywgQ09MUywgY3R4LCBSRVNPTFVUSU9OKTtcclxufSk7XHJcblxyXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44Gj44Gm5LiA5a6a6ZaT6ZqU44Gn5pu05paw44O75o+P55S744KS6KGM44GGXHJcbi8vIE5PVEU6IOODquODleODrOODg+OCt+ODpeODrOODvOODiOOBrumrmOOBhOeUu+mdouOBp+OBr+mAn+OBj+Wun+ihjOOBleOCjOOCiyAo44GT44KM44KS6Ziy44GQ5aC05ZCI44Gv5LiL6KiY44Gu5L6L44KS5Y+C54WnKVxyXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9qYS9kb2NzL1dlYi9BUEkvV2luZG93L3JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgZ3JpZCA9IHVwZGF0ZUdyaWQoZ3JpZCwgUk9XUywgQ09MUyk7XHJcbiAgcmVuZGVyR3JpZChncmlkLCBST1dTLCBDT0xTLCBjdHgsIFJFU09MVVRJT04pO1xyXG4gIGFuaW1hdGlvbklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbn1cclxuXHJcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIC8vIOaXouOBq+OCouODi+ODoeODvOOCt+ODp+ODs+OBjOWLleOBhOOBpuOBhOOCi+WgtOWQiOOBr+S9leOCguOBl+OBquOBhFxyXG4gIGlmIChhbmltYXRpb25JZCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB1cGRhdGUoKTtcclxufSk7XHJcblxyXG5wYXVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgYzlgZzmraLjgZfjgabjgYTjgovloLTlkIjjga/kvZXjgoLjgZfjgarjgYRcclxuICBpZiAoIWFuaW1hdGlvbklkKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbklkKTtcclxuICBhbmltYXRpb25JZCA9IG51bGw7XHJcbn0pO1xyXG5cclxucmVuZGVyR3JpZChncmlkLCBST1dTLCBDT0xTLCBjdHgsIFJFU09MVVRJT04pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=