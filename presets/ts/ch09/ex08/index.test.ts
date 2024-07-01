import { AlarmClock, State } from "./index.ts";

// 実装の変更点
// AlarmClock のコンストラクタの引数に状態を渡すことで、任意の状態の AlarmClock を作れるようにした
// AlarmClock に状態を取得する getter を用意する

// 方針
// 各イベントをすべての状態で実行して、その時の遷移先の状態と実行されるアクションを確認する

describe("setAlarm test", () => {
  test.each([
    ["normal", "alarmSet"],
    ["alarmSet", "alarmSet"],
    ["alarmSounding", "alarmSounding"],
    ["snoozing", "snoozing"],
  ])("state is %s", (state, expStatus) => {
    const alarmClockNormal = new AlarmClock(state as State);
    expect(alarmClockNormal.setAlarm()).toStrictEqual("none");
    expect(alarmClockNormal.getState()).toStrictEqual(expStatus);
  });
});

describe("cancelAlarm test", () => {
  test.each([
    ["normal", "normal", "none"],
    ["alarmSet", "normal", "none"],
    ["alarmSounding", "normal", "stopAlarm"],
    ["snoozing", "normal", "none"],
  ])("state is %s", (state, expStatus, expAction) => {
    const alarmClockNormal = new AlarmClock(state as State);
    expect(alarmClockNormal.cancelAlarm()).toStrictEqual(expAction);
    expect(alarmClockNormal.getState()).toStrictEqual(expStatus);
  });
});

describe("reachedToAlarmTime test", () => {
  test.each([
    ["normal", "normal", "none"],
    ["alarmSet", "alarmSounding", "soundAlarm"],
    ["alarmSounding", "alarmSounding", "none"],
    ["snoozing", "snoozing", "none"],
  ])("state is %s", (state, expStatus, expAction) => {
    const alarmClockNormal = new AlarmClock(state as State);
    expect(alarmClockNormal.reachedToAlarmTime()).toStrictEqual(expAction);
    expect(alarmClockNormal.getState()).toStrictEqual(expStatus);
  });
});

describe("snooze test", () => {
  test.each([
    ["normal", "normal", "none"],
    ["alarmSet", "alarmSet", "none"],
    ["alarmSounding", "snoozing", "stopAlarm"],
    ["snoozing", "snoozing", "none"],
  ])("state is %s", (state, expStatus, expAction) => {
    const alarmClockNormal = new AlarmClock(state as State);
    expect(alarmClockNormal.snooze()).toStrictEqual(expAction);
    expect(alarmClockNormal.getState()).toStrictEqual(expStatus);
  });
});

describe("elapseSnoozeTime test", () => {
  test.each([
    ["normal", "normal", "none"],
    ["alarmSet", "alarmSet", "none"],
    ["alarmSounding", "alarmSounding", "none"],
    ["snoozing", "alarmSounding", "soundAlarm"],
  ])("state is %s", (state, expStatus, expAction) => {
    const alarmClockNormal = new AlarmClock(state as State);
    expect(alarmClockNormal.elapseSnoozeTime()).toStrictEqual(expAction);
    expect(alarmClockNormal.getState()).toStrictEqual(expStatus);
  });
});
