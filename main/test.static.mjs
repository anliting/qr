function doe$1(e){let t=0,n={function:t=>t(e),number:o,object:r,string:d};return c([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(c);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function d(t){e.appendChild(document.createTextNode(t));}function c(e){for(let t;t=n[typeof e];e=t(e));}}let method$1={html(){return doe$1(document.documentElement,...arguments)},head(){return doe$1(document.head,...arguments)},body(){return doe$1(document.body,...arguments)}};var main$2 = new Proxy(doe$1,{get:(e,t)=>method$1[t]||function(){return doe$1(document.createElement(t),...arguments)}});

function doe(e){let t=0,a={function:t=>t(e),number:n,object:o,string:i};return r([...arguments].slice(1)),e;function n(e){t=e;}function o(a){function n(){a.map(r);}a instanceof Array?n():a instanceof Node?e[t?"removeChild":"appendChild"](a):"length"in a||a[Symbol.iterator]?(a=Array.from(a),n()):t?Object.entries(a).map((([t,a])=>e.setAttribute(t,a))):Object.assign(e,a);}function i(t){e.appendChild(document.createTextNode(t));}function r(e){for(let t;t=a[typeof e];e=t(e));}}let method={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var main$1=new Proxy(doe,{get:(e,t)=>method[t]||function(){return doe(document.createElement(t),...arguments)}});let skip=10;class main{constructor(e){this._canvas=main$1.canvas(),this._context=this._canvas.getContext("2d"),this.node=main$1.video({onloadedmetadata:e=>{this._canvas.width=this.node.videoWidth,this._canvas.height=this.node.videoHeight;}}),this._flow=(async()=>{this._engine="BarcodeDetector"in self&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")?"barcodeDetector":"jsQR","barcodeDetector"==this._engine?this._barcodeDetector=new BarcodeDetector({formats:["qr_code"]}):(this._worker=new Worker(e),this._worker.onmessage=e=>e.data&&this.onRead(e.data.data,[this._engine,e.data]));})();}async start(e){let t={media:e};if(this._startFlow=t,await this._flow,t.end)return;this.node.srcObject=t.media;try{await this.node.play();}catch(e){if(!(e instanceof DOMException&&"AbortError"==e.name))throw e}if(t.end)return;let a=0,n=async()=>{if(t.frame=requestAnimationFrame(n),a++%skip)return;this._context.drawImage(this.node,0,0);let e=this._context.getImageData(0,0,this._canvas.width,this._canvas.height);"barcodeDetector"==this._engine?(await this._barcodeDetector.detect(e)).map((e=>this.onRead(e.rawValue,[this._engine,e]))):this._worker.postMessage(e);};t.frame=requestAnimationFrame(n);}async tryResume(){this.node.paused&&await this.node.play();}end(){let e=this._startFlow;e.end=1,e.media.getTracks().map((t=>{e.media.removeTrack(t),t.stop();})),this.node.srcObject&&(this.node.srcObject=null),"frame"in e&&cancelAnimationFrame(e.frame);}}

let qrCodeScanner=new main('../export/worker.mjs')
;(async()=>{
    main$2.body(qrCodeScanner.node);
    let media;
    try{
        media=await navigator.mediaDevices.getUserMedia(
            {video:{facingMode:'environment'}}
        );
    }catch(e){
        if(e.name=='NotAllowedError')
            return alert('The camera is blocked. Please allow the use of your camera and refresh.')
        if(e.name=='NotFoundError')
            return alert('No camera is found. Please attach a camera to your device and refresh.')
    }
    await qrCodeScanner.start(media);
    qrCodeScanner.onRead=console.log;
    self.qrCodeScanner=qrCodeScanner;
})();
