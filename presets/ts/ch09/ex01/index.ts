export class C {
  // C の static フィールド
  // C.C
  static C = class C {
    // C の static フィールド C の クラスメソッド
    // C.C.method()
    static method() {
      return 3;
    }

    // C の static フィールド C のインスタンスメソッド
    // new C.C().method()
    method() {
      return 4;
    }
  };

  // C のメンバー
  // new C().C
  C = class C {
    // C のメンバー C のクラスメソッド
    // new C().C.method()
    static method() {
      return 5;
    }

    // C のメンバー C のインスタンスメソッド
    // new new C().C().method()
    method() {
      return 6;
    }
  };

  // C の クラスメソッド
  // C.method()
  static method(): number {
    return 1;
  }

  // C のインスタンスメソッド
  // new C().method()
  method(): number {
    return 2;
  }
}
