function doe(e){let t=0,n={function:t=>t(e),number:o,object:r,string:d};return c([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(c);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function d(t){e.appendChild(document.createTextNode(t));}function c(e){for(let t;t=n[typeof e];e=t(e));}}let method={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var b = new Proxy(doe,{get:(e,t)=>method[t]||function(){return doe(document.createElement(t),...arguments)}});

//import b from './b.mjs'
console.log(b.a);
