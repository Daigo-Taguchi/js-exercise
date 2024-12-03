## index.js で`document.cookie` プロパティを `console.log`で表示する

![console1](../../../resources/ch15.11-15-ex01-1.png)

session: eb128f5b-2a29-4062-a0a2-6dd852fb7d35

## ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

![console2](../../../resources/ch15.11-15-ex01-2.png)

eb128f5b-2a29-4062-a0a2-6dd852fb7d35

サーバー側と同様のものが表示されている

## ToDo アプリのタブをリロードする

![reload1](../../../resources/todo-reload.gif)

リロードを行っても追加したリストが保持されている

## 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

![reload2](../../../resources/todo-reload2.gif)

![reload3](../../../resources/todo-reload3.gif)

タブ A とタブ B を立ち上げて確認

- A で追加したタスクは B でリロードを行うと反映される
- A でタスクを追加 -> B でリロード -> B で削除 -> A でリロード で反映される
- A で削除したタスクを B で同様に削除しようとするとエラー、その後 B でも反映される

## シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

![reload4](../../../resources/todo-reload4.gif)

chrome と fireFox で確認

- chrome で追加したタスクは fireFox でリロードしても反映されず、別々の情報として保持されている

## http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

変化がなかった
