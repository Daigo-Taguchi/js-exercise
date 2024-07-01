export class TypedMap<K, V> {
  private map;
  private keyType;
  private valueType;

  constructor(keyType: K, valueType: V, entries: Map<K, V>) {
    if (entries) {
      for (const [k, v] of entries) {
        // TS で書くと、そもそも違う型をパラメータに渡せないが、例のまま書く
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }
    this.map = new Map(entries);
    this.keyType = keyType;
    this.valueType = valueType;
  }

  set(key: K, value: V) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }

    return this.map.set(key, value);
  }

  delete(key: K) {
    return this.map.delete(key);
  }
  entries() {
    return this.map.entries();
  }
  forEach(callback: (value: V, key: K, map: Map<K, V>) => Map<K, V>) {
    return this.map.forEach(callback);
  }
  get(key: K) {
    return this.map.get(key);
  }
  has(key: K) {
    return this.map.has(key);
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
}
