import Fuga, {
  Hoge,
  ReExport,
  funcHoge as funcHoge2,
  reExport,
} from "./index.ts";
import funcFuga from "./index2.ts";

const hoge = new Hoge();
hoge.printHoge();

funcHoge2();

const fuga = new Fuga("message");
fuga.print();

funcFuga();

reExport();
const r = new ReExport();
r.print();
