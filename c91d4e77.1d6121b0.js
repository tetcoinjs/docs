(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{139:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return r})),t.d(n,"metadata",(function(){return s})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return d}));var o=t(2),a=t(6),i=(t(0),t(166)),r={title:"Transactions"},s={unversionedId:"api/cookbook/tx",id:"api/cookbook/tx",isDocsHomePage:!1,title:"Transactions",description:"A blockchain is no fun if you are not submitting transactions. Or at least if somebody is not submitting any. Here you will find some snippets for dealing with some common issues.",source:"@site/docs/api/cookbook/tx.md",slug:"/api/cookbook/tx",permalink:"/docs/api/cookbook/tx",editUrl:"https://github.com/polkadot-js/docs/edit/master/docs/api/cookbook/tx.md",version:"current",sidebar:"reference",previous:{title:"Storage",permalink:"/docs/api/cookbook/storage"},next:{title:"ApiPromise Examples",permalink:"/docs/api/examples/promise"}},c=[{value:"How do I estimate the transaction fees?",id:"how-do-i-estimate-the-transaction-fees",children:[]},{value:"How do I get the decoded enum for an ExtrinsicFailed event?",id:"how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event",children:[]},{value:"How do I get the Result of a Sudo event?",id:"how-do-i-get-the-result-of-a-sudo-event",children:[]},{value:"How do I send an unsigned extrinsic?",id:"how-do-i-send-an-unsigned-extrinsic",children:[]},{value:"How can I batch transactions?",id:"how-can-i-batch-transactions",children:[]},{value:"How do I take the pending tx pool into account in my nonce?",id:"how-do-i-take-the-pending-tx-pool-into-account-in-my-nonce",children:[]}],l={rightToc:c};function d(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"A blockchain is no fun if you are not submitting transactions. Or at least if somebody is not submitting any. Here you will find some snippets for dealing with some common issues."),Object(i.b)("h2",{id:"how-do-i-estimate-the-transaction-fees"},"How do I estimate the transaction fees?"),Object(i.b)("p",null,"In addition to the ",Object(i.b)("inlineCode",{parentName:"p"},"signAndSend")," helper on transactions, ",Object(i.b)("inlineCode",{parentName:"p"},".paymentInfo")," (with the exact same parameters) are also exposed. Using the same sender, it applies a dummy signature to the transaction and then gets the fee estimation via RPC."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// estimate the fees as RuntimeDispatchInfo, using the signer (either\n// address or locked/unlocked keypair) (When overrides are applied, e.g\n//  nonce, the format would be `paymentInfo(sender, { nonce })`)\nconst info = await api.tx.balances\n  .transfer(recipient, 123)\n  .paymentInfo(sender);\n\n// log relevant info, partialFee is Balance, estimated for current\nconsole.log(`\n  class=${info.class.toString()},\n  weight=${info.weight.toString()},\n  partialFee=${info.partialFee.toHuman()}\n`);\n")),Object(i.b)("h2",{id:"how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event"},"How do I get the decoded enum for an ExtrinsicFailed event?"),Object(i.b)("p",null,"Assuming you are sending a tx via ",Object(i.b)("inlineCode",{parentName:"p"},".signAndSend"),", the callback yields information around the tx pool status as well as any events when ",Object(i.b)("inlineCode",{parentName:"p"},"isInBlock")," or ",Object(i.b)("inlineCode",{parentName:"p"},"isFinalized"),". If an extrinsic fails via ",Object(i.b)("inlineCode",{parentName:"p"},"system.ExtrinsicFailed")," event, you can retrieve the error, if defined as an enum on a module."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"api.tx.balances\n  .transfer(recipient, 123)\n  .signAndSend(sender, ({ status, events }) => {\n    if (status.isInBlock || status.isFinalized) {\n      events\n        // find/filter for failed events\n        .filter(({ event }) =>\n          api.events.system.ExtrinsicFailed.is(event)\n        )\n        // we know that data for system.ExtrinsicFailed is\n        // (DispatchError, DispatchInfo)\n        .forEach(({ event: { data: [error, info] } }) => {\n          if (error.isModule) {\n            // for module errors, we have the section indexed, lookup\n            const decoded = api.registry.findMetaError(error.asModule);\n            const { documentation, method, section } = decoded;\n\n            console.log(`${section}.${method}: ${documentation.join(' ')}`);\n          } else {\n            // Other, CannotLookup, BadOrigin, no extra info\n            console.log(error.toString());\n          }\n        });\n    }\n  });\n")),Object(i.b)("p",null,"As of the ",Object(i.b)("inlineCode",{parentName:"p"},"@polkadot/api")," 2.3.1 additional result fields are exposed. Firstly there is ",Object(i.b)("inlineCode",{parentName:"p"},"dispatchInfo: DispatchInfo")," which occurs in both ",Object(i.b)("inlineCode",{parentName:"p"},"ExtrinsicSuccess")," & ",Object(i.b)("inlineCode",{parentName:"p"},"ExtrinsicFailed")," events. Additionally, on failures the ",Object(i.b)("inlineCode",{parentName:"p"},"dispatchError: DispatchError")," is exposed. With this in mind, the above can be simplified to be -"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"api.tx.balances\n  .transfer(recipient, 123)\n  .signAndSend(sender, ({ status, events, dispatchError }) => {\n    // status would still be set, but in the case of error we can shortcut\n    // to just check it (so an error would indicate InBlock or Finalized)\n    if (dispatchError) {\n      if (dispatchError.isModule) {\n        // for module errors, we have the section indexed, lookup\n        const decoded = api.registry.findMetaError(dispatchError.asModule);\n        const { documentation, name, section } = decoded;\n\n        console.log(`${section}.${name}: ${documentation.join(' ')}`);\n      } else {\n        // Other, CannotLookup, BadOrigin, no extra info\n        console.log(dispatchError.toString());\n      }\n    }\n  });\n")),Object(i.b)("h2",{id:"how-do-i-get-the-result-of-a-sudo-event"},"How do I get the Result of a Sudo event?"),Object(i.b)("p",null,"The section above shows you how to listen for the result of a regular extrinsic. However, Sudo extrinsics do not directly report the success or failure of the underlying call. Instead, a Sudo transaction will return ",Object(i.b)("inlineCode",{parentName:"p"},"Sudid(result)"),", where ",Object(i.b)("inlineCode",{parentName:"p"},"result")," will be the information you are looking for."),Object(i.b)("p",null,"To properly parse this information, we will follow the steps above, but then specifically peek into the event data to find the final result:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"const unsub = await api.tx.sudo\n  .sudo(\n    api.tx.balances.forceTransfer(user1, user2, amount)\n  )\n  .signAndSend(sudoPair, ({ status, events }) => {\n    if (status.isInBlock || status.isFinalized) {\n      events\n        // We know this tx should result in `Sudid` event.\n        .filter(({ event }) =>\n          api.events.sudo.Sudid.is(event)\n        )\n        // We know that `Sudid` returns just a `Result`\n        .forEach(({ event : { data: [result] } }) => {\n          // Now we look to see if the extrinsic was actually successful or not...\n          if (result.isError) {\n            let error = result.asError;\n            if (error.isModule) {\n              // for module errors, we have the section indexed, lookup\n              const decoded = api.registry.findMetaError(error.asModule);\n              const { documentation, name, section } = decoded;\n\n              console.log(`${section}.${name}: ${documentation.join(' ')}`);\n            } else {\n              // Other, CannotLookup, BadOrigin, no extra info\n              console.log(error.toString());\n            }\n          }\n        });\n      unsub();\n    }\n  });\n")),Object(i.b)("h2",{id:"how-do-i-send-an-unsigned-extrinsic"},"How do I send an unsigned extrinsic?"),Object(i.b)("p",null,"For most runtime modules, transactions need to be signed and validation for this happens node-side. There are however modules that accepts unsigned extrinsics, an example would be the Polkadot/Kusama token claims (which is here used as an example)."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// construct the transaction, exactly as per normal\nconst utx = api.tx.claims.claim(beneficiary, ethSignature);\n\n// send it without calling sign, pass callback with status/events\ntx.send(({ status }) => {\n  if (status.isInBlock) {\n    console.log(`included in ${status.asInBlock}`);\n  }\n});\n")),Object(i.b)("p",null,"The signing is indicated by the first byte in the transaction, so in this case we have called ",Object(i.b)("inlineCode",{parentName:"p"},".send")," on it (no ",Object(i.b)("inlineCode",{parentName:"p"},".sign")," or ",Object(i.b)("inlineCode",{parentName:"p"},".signAndSend"),"), so it will be sent using the unsigned state, without signature attached."),Object(i.b)("h2",{id:"how-can-i-batch-transactions"},"How can I batch transactions?"),Object(i.b)("p",null,"Polkadot/Substrate provides a ",Object(i.b)("inlineCode",{parentName:"p"},"utility.batch")," method that can be used to send a number of transactions at once. These are then executed from a single sender (single nonce specified) in sequence. This is very useful in a number of cases, for instance if you wish to create a payout for a validator for multiple eras, you can use this method. Likewise, you can send a number of transfers at once. Or even batch different types of transactions."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// construct a list of transactions we want to batch\nconst txs = [\n  api.tx.balances.transfer(addrBob, 12345),\n  api.tx.balances.transfer(addrEve, 12345),\n  api.tx.staking.unbond(12345)\n];\n\n// construct the batch and send the transactions\napi.tx.utility\n  .batch(txs)\n  .signAndSend(sender, ({ status }) => {\n    if (status.isInBlock) {\n      console.log(`included in ${status.asInBlock}`);\n    }\n  });\n")),Object(i.b)("h2",{id:"how-do-i-take-the-pending-tx-pool-into-account-in-my-nonce"},"How do I take the pending tx pool into account in my nonce?"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"system.account")," query will always contain the current state, i.e. it will reflect the nonce for the last known block. As such when sending multiple transactions in quick succession (see batching above), there may be transactions in the pool that has the same nonce that ",Object(i.b)("inlineCode",{parentName:"p"},"signAndSend")," would apply - this call doesn't do any magic, it simply reads the state for the nonce. Since we can specify options to the ",Object(i.b)("inlineCode",{parentName:"p"},"signAndSend")," operation, we can override the nonce, either by manually incrementing it or querying it via ",Object(i.b)("inlineCode",{parentName:"p"},"rpc.system.accountNextIndex"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"for (let i = 0; i < 10; i++) {\n  // retrieve sender's next index/nonce, taking txs in the pool into account\n  const nonce = await api.rpc.system.accountNextIndex(sender);\n\n  // send, just retrieving the hash, not waiting on status\n  const txhash = await api.tx.balances\n    .transfer(recipient, 123)\n    .signAndSend(sender, { nonce });\n}\n")),Object(i.b)("p",null,"As a convenience function, the ",Object(i.b)("inlineCode",{parentName:"p"},"accountNextIndex")," can be omitted by specifying a nonce of ",Object(i.b)("inlineCode",{parentName:"p"},"-1"),", allow the API to do the lookup. In this case the above can be simplified even further,"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"for (let i = 0; i < 10; i++) {\n  const txhash = await api.tx.balances\n    .transfer(recipient, 123)\n    .signAndSend(sender, { nonce: -1 });\n}\n")),Object(i.b)("p",null,"The latter form is preferred since it dispatches the RPC calls for nonce and blockHash (used for mortality) in parallel and therefore will yield a better throughput, especially with the above bulk example."))}d.isMDXComponent=!0},166:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return h}));var o=t(0),a=t.n(o);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=a.a.createContext({}),d=function(e){var n=a.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=d(e.components);return a.a.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=d(t),b=o,h=u["".concat(r,".").concat(b)]||u[b]||p[b]||i;return t?a.a.createElement(h,s(s({ref:n},l),{},{components:t})):a.a.createElement(h,s({ref:n},l))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,r=new Array(i);r[0]=b;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var l=2;l<i;l++)r[l]=t[l];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);