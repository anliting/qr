function d(b){function c(a){for(let e;e=g[typeof a];a=e(a));}let f=0,g={g:a=>a(b),i:function(a){f=a},object:function(a){if(a instanceof Array)a.map(c);else if(a instanceof Node)b[f?"removeChild":"appendChild"](a);else"length"in a||a[Symbol.iterator]?(a=Array.from(a),a.map(c)):f?Object.entries(a).map(([e,h])=>b.setAttribute(e,h)):Object.assign(b,a)},j:function(a){b.appendChild(document.createTextNode(a))}};return c([...arguments].slice(1)),b}let k={h(){return d(document.documentElement,...arguments)},head(){return d(document.head,...arguments)},body(){return d(document.body,...arguments)}};new Proxy(d,{get:(b,c)=>k[c]||function(){return d(document.createElement(c),...arguments)}});export{};
