function doe(e){let t=0,n={function:t=>t(e),number:o,object:a,string:i};return r([...arguments].slice(1)),e;function o(e){t=e}function a(n){function o(){n.map(r)}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n)}function i(t){e.appendChild(document.createTextNode(t))}function r(e){for(let t;t=n[typeof e];e=t(e));}}let method={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var main=new Proxy(doe,{get:(e,t)=>method[t]||function(){return doe(document.createElement(t),...arguments)}});let skip=60;function QrCodeScanner(e){this._canvas=main.canvas(),this._context=this._canvas.getContext("2d"),this.node=main.video({onloadedmetadata:e=>{this._canvas.width=this.node.videoWidth,this._canvas.height=this.node.videoHeight}}),this._flow=(async()=>{this._engine="BarcodeDetector"in self&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")?"barcodeDetector":"jsQR","barcodeDetector"==this._engine?this._barcodeDetector=new BarcodeDetector({formats:["qr_code"]}):(this._worker=new Worker(e),this._worker.onmessage=e=>this.onRead(e.data))})()}QrCodeScanner.prototype.start=function(){return this._flow=(async()=>{await this._flow,this.node.srcObject=this._stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),await this.node.play();let e=0,t=async()=>{if(this._frame=requestAnimationFrame(t),this._context.drawImage(this.node,0,0),e++%skip)return;let n=this._context.getImageData(0,0,this._canvas.width,this._canvas.height);"barcodeDetector"==this._engine?(await this._barcodeDetector.detect(n)).map((e=>this.onRead(e.rawValue))):this._worker.postMessage(n)};this._frame=requestAnimationFrame(t)})()},QrCodeScanner.prototype.end=function(){return this._flow=(async()=>{await this._flow,cancelAnimationFrame(this._frame),this._stream.getTracks().map((e=>{this.node.srcObject.removeTrack(e),e.stop()}))})()};export{QrCodeScanner as default};