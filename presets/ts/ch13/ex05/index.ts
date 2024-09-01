import { wait } from "../module.ts";

export function g1(): Promise<void> {
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

export function g2(): Promise<void> {
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

interface User {
  id: number;
  name: string;
}
export function g3(): Promise<void> {
  // 以下2つの関数が存在するとします (中身は適当)
  function fetchUser(): Promise<User> {
    return Promise.resolve({ id: 42, name: "John" });
  }

  // eslint-disable-next-line
  function fetchUserFriends(user: User) {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  return fetchUser().then((user) => {
    return fetchUserFriends(user).then((friends) => {
      console.log(`${user} has ${friends.length} friends!`);
    });
  });
}

export function g4(): Promise<number> {
  function someFunction(): number {
    return 42;
  }

  return Promise.resolve(someFunction());
}
