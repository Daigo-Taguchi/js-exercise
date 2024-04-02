## 予想

answer: 42
answe: 0

が表示される

## 開発者ツールを開いた状態で HTML を開く

```
{answer: 42}
{answer: 0}
```

## HTML を開いた状態で開発者ツールを開く

```
{answer: 0}
{answer: 0}
```

## 常に期待した結果を得るための修正

```html
<!doctype html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(life);
      let hoge = { answer: 0 };
      console.log(hoge);
    </script>
  </body>
</html>
```
