## Web アプリケーションがユーザの機密情報をセキュアに扱うためにはどのようなことが必要になるか記述しなさい

- データベースの暗号化
  - ユーザーの機密情報は暗号化してから DB に格納することで、第三者から DB の情報が漏れた場合でも、ユーザーの機密情報を守ることができる
- ハッシュ化
  - パスワードを保存する場合は、sha-256 などのハッシュ関数を利用
- SQL インジェクション対策
- XSS 対策
