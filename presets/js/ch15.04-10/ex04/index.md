## 1. TOC.js の実行

画面に目次が表示されて、コンテンツに対して番号が割り振られる

## 2. ブックマークレットの作成

TOC.js の内容を 1行にコンパイルして、bookmark の URL に登録
1行にコンパイルするのは外部サイトで実行
https://closure-compiler.appspot.com/home

```
javascript:'use strict';(()=>{let d=document.querySelector("#TOC");d||(d=document.createElement("div"),d.id="TOC",document.body.prepend(d));var c=document.querySelector("#TOC-style");c||(c=document.createElement("style"),c.id="TOC-style",document.body.prepend(c));c.textContent='\n  #TOC {\n    border: solid black 1px;\n    margin: 10px;\n    padding: 10px;\n\n    /* \u8ffd\u52a0 (\u53f3\u4e0a\u306b\u56fa\u5b9a\u8868\u793a) */\n    position: fixed;\n    top: 20px;\n    right: 20px;\n    width: 250px;\n    padding: 10px;\n    background-color: #f0f0f0;\n    border: 1px solid #ccc;\n    overflow-y: auto;\n    max-height: calc(100vh - 40px);\n    z-index: 9999;\n  }\n  .TOCEntry { margin: 5px 0px; }\n  .TOCEntry a { text-decoration: none; }\n  .TOCLevel1 { font-weight: bold; }\n  .TOCLevel2 { margin-left: .25in; }\n  .TOCLevel3 { margin-left: .5in; }\n  .TOCSectNum:after { content: ": "; }\n      ';
var e=document.querySelectorAll("h2,h3,h4,h5,h6");c=[0,0,0,0,0];for(let f of e)if(f.parentNode!==d){e=parseInt(f.tagName.charAt(1))-1;c[e-1]++;for(var a=e;a<c.length;a++)c[a]=0;a=c.slice(0,e).join(".");var b=document.createElement("span");b.className="TOCSectNum";b.textContent=a;f.prepend(b);b=document.createElement("a");a=`TOC${a}`;b.name=a;f.before(b);b.append(f);b=document.createElement("a");b.href=`#${a}`;b.innerHTML=f.innerHTML;a=document.createElement("div");a.classList.add("TOCEntry",`TOCLevel${e}`);
a.append(b);d.append(a)}})();
```

任意の Web サイトでこの bookmarklet を実行
