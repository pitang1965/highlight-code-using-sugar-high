import './App.css';
import { highlight } from 'sugar-high';

const entityConvert = (org_string) => {
  let converted = org_string.replace(/(&lt;)/g,"<");
  converted = converted.replace(/(&gt;)/g,">");
  return (converted);
}

const removeCodeTags = (org_string) => {
  let converted = org_string.replace("<code xmlns=\"http://www.w3.org/1999/xhtml\">","");
  converted = converted.replace("</code>","");
  return (converted);
}

function highlightCodeContents(htmlContent) {
  try {
    // HTML文字列をDOMのDocumentとして解釈
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    if (doc === null) return htmlContent;

    // コードブロック(<code> ... </code>)群を検索
    const codes = doc.querySelectorAll('code');
    
    // DOM ツリーを表すXML 文字列を構築するための準備
    const serializer = new XMLSerializer();
    
    // 各コードブロックを処理
    codes.forEach((code) => {
      let codeString = serializer.serializeToString(code); // codeタグの間を取りたいが、codeタグやエンティティ文字を含んでいたりいなかったり
      codeString = entityConvert(codeString); // エンティティ文字を通常の文字へ変換
      codeString = removeCodeTags(codeString);
      codeString = highlight(codeString);
      const newCode = document.createElement('code');
      newCode.innerHTML = codeString
      const parent = code.parentNode
      parent.replaceChild(newCode, code);
    });
    
    // DOMツリーを表す文字列を構築
    return serializer.serializeToString(doc);
  } catch (ex) {
    console.error(ex.message);
  }

  return htmlContent;
}

const code1 = `
import './App.css';
import { highlight } from 'sugar-high';

// コメント

const codeHTML = highlight(code);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <div dangerouslySetInnerHTML={{ __html: codeHTML }} />
      </header>
    </div>
  );
}

export default App;
`;

const code2 =`
<Router>
  <Home path="/" />
  <Users path="/events" />
  <Redirect from="/dashboard" to="/events" />
</Router>
`;

const contents = `
\n<h1 id=\"概要\">概要</h1>\n\n\n\n<p><strong>React Router v6</strong>を用いて<strong>SPA</strong>アプリを作った場合で、例えば <em>about </em>ページでリロードしたり、<em>about</em>ページに遷移したときの<strong>URL</strong>を直接ブラウザに入力した場合に次のようなエラーになりました。</p>\n\n\n\n<div class=\"wp-block-image\"><figure class=\"aligncenter size-full is-resized\"><div data-gatsby-image-wrapper=\"\" style=\"position:relative;overflow:hidden;display:inline-block;vertical-align:top\" class=\"gatsby-image-wrapper gatsby-image-wrapper-constrained wp-image-3976 inline-gatsby-image-wrapper\" data-reactroot=\"\"><div style=\"max-width:486px;display:block\"><img alt=\"\" role=\"presentation\" aria-hidden=\"true\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg height=&#x27;311&#x27; width=&#x27;486&#x27; xmlns=&#x27;http://www.w3.org/2000/svg&#x27; version=&#x27;1.1&#x27;%3E%3C/svg%3E\" style=\"max-width:100%;display:block;position:static\"/></div><div aria-hidden=\"true\" data-placeholder-image=\"\" style=\"height:100%;left:0;position:absolute;top:0;width:100%\"></div><picture><source type=\"image/webp\" data-srcset=\"/static/6c4fa0aa89f1700892a554d915cd9788/2a1ce/image.webp 122w,/static/6c4fa0aa89f1700892a554d915cd9788/5b287/image.webp 243w,/static/6c4fa0aa89f1700892a554d915cd9788/120e5/image.webp 486w\" sizes=\"(min-width: 486px) 486px, 100vw\"/><img data-gatsby-image-ssr=\"\" data-wp-inline-image=\"1\" data-main-image=\"\" style=\"height:100%;left:0;position:absolute;top:0;transform:translateZ(0);transition:opacity 250ms linear;width:100%;will-change:opacity;opacity:0\" sizes=\"(min-width: 486px) 486px, 100vw\" decoding=\"async\" loading=\"lazy\" data-src=\"/static/6c4fa0aa89f1700892a554d915cd9788/f856c/image.png\" data-srcset=\"/static/6c4fa0aa89f1700892a554d915cd9788/a01a6/image.png 122w,/static/6c4fa0aa89f1700892a554d915cd9788/dce5c/image.png 243w,/static/6c4fa0aa89f1700892a554d915cd9788/f856c/image.png 486w\" alt=\"Page not fount\"/></picture><noscript><picture><source type=\"image/webp\" srcSet=\"/static/6c4fa0aa89f1700892a554d915cd9788/2a1ce/image.webp 122w,/static/6c4fa0aa89f1700892a554d915cd9788/5b287/image.webp 243w,/static/6c4fa0aa89f1700892a554d915cd9788/120e5/image.webp 486w\" sizes=\"(min-width: 486px) 486px, 100vw\"/><img data-gatsby-image-ssr=\"\" data-wp-inline-image=\"1\" data-main-image=\"\" style=\"height:100%;left:0;position:absolute;top:0;transform:translateZ(0);transition:opacity 250ms linear;width:100%;will-change:opacity;opacity:0\" sizes=\"(min-width: 486px) 486px, 100vw\" decoding=\"async\" loading=\"lazy\" src=\"/static/6c4fa0aa89f1700892a554d915cd9788/f856c/image.png\" srcSet=\"/static/6c4fa0aa89f1700892a554d915cd9788/a01a6/image.png 122w,/static/6c4fa0aa89f1700892a554d915cd9788/dce5c/image.png 243w,/static/6c4fa0aa89f1700892a554d915cd9788/f856c/image.png 486w\" alt=\"Page not fount\"/></picture></noscript><script type=\"module\">const t=\"undefined\"!=typeof HTMLImageElement&&\"loading\"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll(\"img[data-main-image]\");for(let e of t){e.dataset.src&&(e.setAttribute(\"src\",e.dataset.src),e.removeAttribute(\"data-src\")),e.dataset.srcset&&(e.setAttribute(\"srcset\",e.dataset.srcset),e.removeAttribute(\"data-srcset\"));const t=e.parentNode.querySelectorAll(\"source[data-srcset]\");for(let e of t)e.setAttribute(\"srcset\",e.dataset.srcset),e.removeAttribute(\"data-srcset\");e.complete&&(e.style.opacity=1)}}</script></div><script type=\"application/json\" data-wp-inline-image-hydration=\"1\">{\"image\":{\"layout\":\"constrained\",\"backgroundColor\":\"#081828\",\"images\":{\"fallback\":{\"src\":\"/static/6c4fa0aa89f1700892a554d915cd9788/f856c/image.png\",\"srcSet\":\"/static/6c4fa0aa89f1700892a554d915cd9788/a01a6/image.png 122w,\\n/static/6c4fa0aa89f1700892a554d915cd9788/dce5c/image.png 243w,\\n/static/6c4fa0aa89f1700892a554d915cd9788/f856c/image.png 486w\",\"sizes\":\"(min-width: 486px) 486px, 100vw\"},\"sources\":[{\"srcSet\":\"/static/6c4fa0aa89f1700892a554d915cd9788/2a1ce/image.webp 122w,\\n/static/6c4fa0aa89f1700892a554d915cd9788/5b287/image.webp 243w,\\n/static/6c4fa0aa89f1700892a554d915cd9788/120e5/image.webp 486w\",\"type\":\"image/webp\",\"sizes\":\"(min-width: 486px) 486px, 100vw\"}]},\"width\":486,\"height\":311},\"alt\":\"Page not fount\",\"className\":\"wp-image-3976 inline-gatsby-image-wrapper\",\"data-wp-inline-image\":\"1\"}</script><figcaption>Page Not Found</figcaption></figure></div>\n\n\n\n<p>これの解決方法について、ホスティング先が<strong>Netlify</strong>である場合についての解決方法のメモです。</p>\n\n\n\n<h1 id=\"リダイレクトについて\">リダイレクトについて</h1>\n\n\n\n<p><strong>React Rounter</strong>の以前のバージョンでは、例えば、次のように書くことによって<em>/dashboard</em> にアクセスしたら、<em>/events</em> にリダイレクトすることが次のように書くことができたそうです。</p>\n\n\n\n<pre class=\"wp-block-code\"><code>&lt;Router&gt;\n  &lt;Home path=\"/\" /&gt;\n  &lt;Users path=\"/events\" /&gt;\n  &lt;Redirect from=\"/dashboard\" to=\"/events\" /&gt;\n&lt;/Router&gt;</code></pre>\n\n\n\n<p>ところが、<strong>React Router v6</strong>ではこの機能はなくなり、代替機能も無くしたとのことです（<a href=\"https://reactrouterdotcom.fly.dev/docs/en/v6/upgrading/reach#redirect-redirectto-isredirect\" target=\"_blank\" rel=\"noreferrer noopener\">参照</a>）。</p>\n\n\n\n<p>この機能があればどこの<strong>URL</strong>にアクセスしてもホームページにリダイレクトすること可能です（そのことによって今回の問題が解決する）。</p>\n\n\n\n<p>この機能が無くなったのでどうすればよいかというと、<strong>Firebase</strong>とか<strong>Netlify</strong>とかの<strong>Webホスティングサービス</strong>で提供すればよいとのことです。</p>\n\n\n\n<p>公式ドキュメントでは、<strong>Firebase</strong>の場合に、<strong>firebase.json</strong>という設定ファイルで次のようにすることでリダイレクトが可能と説明しています。</p>\n\n\n\n<pre class=\"wp-block-code\"><code>// React Router v6\n// firebase.json config file\n{\n  // ...\n  \"hosting\": {\n    \"redirects\": &#91;\n      {\n        \"source\": \"/dashboard\",\n        \"destination\": \"/events\",\n        \"type\": 301\n      }\n    ]\n  }\n}</code></pre>\n\n\n\n<h1 id=\"netlifyでの解決方法\">Netlifyでの解決方法</h1>\n\n\n\n<p>今回の件では、プロジェクトのルートにある <strong>netlify.toml </strong>というファイルで、次の後半にあるようなリダイレクト設定をおこなうことにより解決しました。</p>\n\n\n\n<pre class=\"wp-block-code\"><code>&#91;build]\n  publish = \"/dist\"\n  command = \"npm run build\"\n  functions=\"api\"\n\n&#91;&#91;redirects]]\n  from = \"/*\"\n  to = \"/\"\n  status = 200</code></pre>\n\n\n\n<p></p>\n
`;

const codeHTML1 = highlight(code1);
const codeHTML2 = highlight(code2);
const codeHTML3 = highlightCodeContents(contents);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <code dangerouslySetInnerHTML={{ __html: codeHTML1 }} />
        <code dangerouslySetInnerHTML={{ __html: codeHTML2 }} />
        <code dangerouslySetInnerHTML={{ __html: codeHTML3 }} />
      </header>
    </div>
  );
}

export default App;
