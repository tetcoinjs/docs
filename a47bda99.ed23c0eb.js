(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return d}));var a=n(2),i=n(6),r=(n(0),n(167)),o={title:"Initialization"},l={unversionedId:"ui-keyring/start/init",id:"ui-keyring/start/init",isDocsHomePage:!1,title:"Initialization",description:"To understand the initialization process, some background on the underlying libraries are required. For the Schnorrkel sr25519 a WASM library is used. This means that before sr25519 can be used, the WASM libraries needs to be loaded and initialized. This is not an issue when the keyring only uses ed25519.",source:"@site/docs/ui-keyring/start/init.md",slug:"/ui-keyring/start/init",permalink:"/docs/ui-keyring/start/init",editUrl:"https://github.com/polkadot-js/docs/edit/master/docs/ui-keyring/start/init.md",version:"current",sidebar:"reference",previous:{title:"Installation",permalink:"/docs/ui-keyring/start/install"},next:{title:"Accounts",permalink:"/docs/ui-keyring/start/accounts"}},s=[{value:"Create",id:"create",children:[]},{value:"Using with the API",id:"using-with-the-api",children:[]},{value:"Additional create options",id:"additional-create-options",children:[]},{value:"Managing accounts",id:"managing-accounts",children:[]}],c={rightToc:s};function d(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"To understand the initialization process, some background on the underlying libraries are required. For the ",Object(r.b)("a",{parentName:"p",href:"https://github.com/w3f/schnorrkel"},"Schnorrkel sr25519")," a WASM library is used. This means that before ",Object(r.b)("inlineCode",{parentName:"p"},"sr25519")," can be used, the WASM libraries needs to be loaded and initialized. This is not an issue when the keyring only uses ",Object(r.b)("inlineCode",{parentName:"p"},"ed25519"),"."),Object(r.b)("p",null,"If you have been through the ",Object(r.b)("a",{parentName:"p",href:"../../keyring/start"},"base keyring documentation"),", you should be familiar with this process."),Object(r.b)("h2",{id:"create"},"Create"),Object(r.b)("p",null,"With this in mind, we take care of the initialization before we load our keyring, yielding -"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-js"},"import keyring from '@polkadot/ui-keyring';\nimport { cryptoWaitReady } from '@polkadot/util-crypto';\n\ncryptoWaitReady().then(() => {\n  // load all available addresses and accounts\n  keyring.loadAll({ ss58Format: 42, type: 'sr25519' });\n\n  // additional initialization here, including rendering\n});\n")),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"cryptoWaitReady()")," promise resolves as soon as the underlying WASM libraries have been made available. This is followed by ",Object(r.b)("inlineCode",{parentName:"p"},"keyring.loadAll(...)")," which is the main initialization for the keyring, which"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"initializes the underlying ",Object(r.b)("inlineCode",{parentName:"li"},"@polkadot/keyring")),Object(r.b)("li",{parentName:"ul"},"loads all available accounts, addresses band contracts previously stored"),Object(r.b)("li",{parentName:"ul"},"sets up the default address format with ",Object(r.b)("inlineCode",{parentName:"li"},"42")," (This is the substrate development default. When not specified, this defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"42"),")"),Object(r.b)("li",{parentName:"ul"},"defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"sr25519")," accounts (We can still add ",Object(r.b)("inlineCode",{parentName:"li"},"ed25519")," accounts, more on this later. When not specified this defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"sr25519"),")")),Object(r.b)("p",null,"Since you would generally want the keyring available before rendering the UI (although it can be done elsewhere, showing some info while loading), the following pattern is used in ",Object(r.b)("a",{parentName:"p",href:"https://github.com/polkadot-js/ui"},"our examples"),", both React and Vue shown here -"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-js"},"...\ncryptoWaitReady().then(() => {\n  keyring.loadAll({ ... });\n\n  // mount React and render\n  ReactDOM.render(<App />, document.getElementById('app'));\n});\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-js"},"...\ncryptoWaitReady().then(() => {\n  keyring.loadAll({ ... });\n\n  // mount Vue and render\n  new Vue({ render: (h) => h(App) }).$mount('#app');\n});\n")),Object(r.b)("h2",{id:"using-with-the-api"},"Using with the API"),Object(r.b)("p",null,"When using the keyring together with the Polkadot-js API, the above would be adapted since the API itself already has a check for the WASM availability. In this case, we can adapt the interface to follow the following pattern -"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-js"},"import { ApiPromise } from '@polkadot/api';\nimport keyring from '@polkadot/ui-keyring';\n\n...\nApiPromise.create({ ... }).then(() => {\n  keyring.loadAll({ ... });\n\n  // additional initialization here, including rendering\n});\n")),Object(r.b)("p",null,"The above pattern is how initialization is done in some applications such as the ",Object(r.b)("a",{parentName:"p",href:"https://polkadot.js.org/apps/"},"polkadot-js apps UI"),"."),Object(r.b)("h2",{id:"additional-create-options"},"Additional create options"),Object(r.b)("p",null,"In addition to the ",Object(r.b)("inlineCode",{parentName:"p"},"ss58Format")," and ",Object(r.b)("inlineCode",{parentName:"p"},"type")," options (both optional), the following additional configuration options are available to the ",Object(r.b)("inlineCode",{parentName:"p"},"loadAll(...)")," call -"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"filter?: (json: KeyringJson) => boolean")," - An optional filter that is executed on account loading. This allows us to check the loaded account and apply rules on it before including it in the keyring. Generally this would be used for advanced cases, any account that is filtered with ",Object(r.b)("inlineCode",{parentName:"p"},"false")," won't appear.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"genesisHash?: Hash")," - The ",Object(r.b)("inlineCode",{parentName:"p"},"genesisHash")," of accounts to should be loaded. The meta property of the account ",Object(r.b)("em",{parentName:"p"},"may")," contain a ",Object(r.b)("inlineCode",{parentName:"p"},"genesisHash"),", when both are available and non-matching, the account will not be included. To populate this option, the easiest way is to pass the ",Object(r.b)("inlineCode",{parentName:"p"},"api.genesisHash")," property.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"isDevelopment?: boolean")," - This flag, when set to ",Object(r.b)("inlineCode",{parentName:"p"},"true"),' loads the keyring in development mode. This means that the default development accounts such as "Alice", "Bob", ..., "Ferdie" are included in the keyring. Generally you would only specify this when  actually connected to a development chain.')),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"store?: KeyringStore")," - An optional store to be used. By default the ",Object(r.b)("inlineCode",{parentName:"p"},"ui-keyring")," will user browser localStorage, but with a specific store this behavior can be adjusted. For instance, for an extension we would default to the extension store (although localStorage is available) and for Electron apps, we may want to default to file storage."))),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-js"},"// For file storage where available, e.g. in Electron environments.\n// This takes an path in the constructor, new FileStore('~./keyring-data')\n// import { FileStore } from '@polkadot/ui-keyring/stores';\n\n// When the store is not specified, it defaults to new BrowserStore()\n// import { BrowserStore } from '@polkadot/ui-keyring/stores';\n\n...\n// ExensionStore is available in https://github.com/polkadot-js/extension\nkeyring.loadAll({ store: new ExtensionStore(), ... });\n")),Object(r.b)("h2",{id:"managing-accounts"},"Managing accounts"),Object(r.b)("p",null,"With the keyring installed and ready for use, ",Object(r.b)("a",{parentName:"p",href:"/docs/ui-keyring/start/accounts"},"next we will dive into adding and managing accounts"),"."))}d.isMDXComponent=!0},167:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=i.a.createContext({}),d=function(e){var t=i.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},u=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=d(n),u=a,h=p["".concat(o,".").concat(u)]||p[u]||b[u]||r;return n?i.a.createElement(h,l(l({ref:t},c),{},{components:n})):i.a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);