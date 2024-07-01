interface Counter {
  count: () => number;
  reset: () => void;
  getCount: () => number;
}

export function counterGroup() {
  const counters: Counter[] = [];
  return {
    newCounter: function () {
      let n = 0;
      const counter = {
        count: function () {
          return n++;
        },
        reset: function () {
          n = 0;
        },
        getCount: function () {
          return n;
        },
      };
      counters.push(counter);
      return counter;
    },
    total: function () {
      return counters.reduce((sum, counter) => sum + counter.getCount(), 0);
    },
  };
}
