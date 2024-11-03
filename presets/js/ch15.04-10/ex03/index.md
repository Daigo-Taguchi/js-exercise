## CSS に関して実行できる操作

- スタイルの変更
- 上書きされたスタイルや向こうなスタイルの確認
- プロパティのつけ外し

## Tailwind CSS のクラスを開発者ツールから追加すると変更が反映されない理由

Tailwind CSS には JIT (Just In Time)モードが存在し、version 3 系ではデフォルトで ON になっている。
JIT モードでは実際にプロジェクトで使用されるクラスだけを生成する。
したがって、開発者ツールから利用していないクラスを新規追加しても反映されない。

https://v2.tailwindcss.com/docs/just-in-time-mode
