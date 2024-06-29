## 即時関数実行式を利用している例

https://www.office-augusta.com/sukimaswitch/js/script.js?1657292243

```js
(function () {
  if ($(".accordion__trigger")[0]) {
    $(".accordion__trigger").on("click", function () {
      var $trigger = $(this);
      var $target = $trigger.next(".accordion__target");
      $trigger.toggleClass("open");
      $target.slideToggle();
    });
  }
})();
```
