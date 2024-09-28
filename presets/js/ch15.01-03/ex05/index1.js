/* eslint-disable no-undef */

// script タグの defer="true" で HTML のパースが完了してから 本 js が実行される
// defer="true" の場合、DOMContentLoaded イベントの直前に js が実行されるので
// DOMContentLoaded を設定しても速度に影響がないため設定しない
$("div#1000").html(_.capitalize("hello"));
