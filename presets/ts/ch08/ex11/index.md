## 自作関数

```js
const originalFn = function (x: number, y: number) {
  return x + y;
};
```

上記の自作を関数を利用して検証

結果

```
function (x, y) {
    return x + y;
}
```

## 組み込み関数

Math.abs を利用して検証

結果

```
function abs() { [native code] }
```
