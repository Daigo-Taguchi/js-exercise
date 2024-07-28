export type Constructor<T> = new () => T;

export class TypedMap {
  private map = new Map();

  set<V>(key: Constructor<V>, value: V) {
    this.map.set(key, value);
  }

  get<K>(key: K) {
    return this.map.get(key);
  }
}

// class Foo {}

// const typedMap = new TypedMap();
// typedMap.set(String, "string");
// typedMap.set(Number, 123);
// typedMap.set(Foo, new Foo());

// typedMap.set(String, 123); // 型エラー

// console.log(typedMap.get(String));
// console.log(typedMap.get(Number));
