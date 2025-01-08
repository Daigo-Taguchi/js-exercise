import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// 子プロセスを再起動する関数
async function restartChild() {
  let [code, signal] = await startChild();
  console.log(`Child process exited with code ${code} and signal ${signal}`);

  // 以上終了した場合は再起動する
  while (code !== 0) {
    console.log("Restarting child process");
    [code, signal] = await startChild();
    console.log(`Child process exited with code ${code} and signal ${signal}`);
  }
}

// シグナルをトラップして子プロセスに通知する
function handleSignal(signal) {
  if (child) {
    console.log(`Sending ${signal} to child process`);
    child.kill(signal);
  }
  process.exit();
}

// 監視するシグナルを設定
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => handleSignal(signal));
});

restartChild();
