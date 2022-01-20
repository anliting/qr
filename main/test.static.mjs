function e$1(e){let t=0,n={function:t=>t(e),number:o,object:r,string:c};return u([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(u);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function c(t){e.appendChild(document.createTextNode(t));}function u(e){for(let t;t=n[typeof e];e=t(e));}}let t$1={html(){return e$1(document.documentElement,...arguments)},head(){return e$1(document.head,...arguments)},body(){return e$1(document.body,...arguments)}};var doe = new Proxy(e$1,{get:(n,o)=>t$1[o]||function(){return e$1(document.createElement(o),...arguments)}});

function e(e){let t=0,a={function:t=>t(e),number:n,object:i,string:o};return r([...arguments].slice(1)),e;function n(e){t=e;}function i(a){function n(){a.map(r);}a instanceof Array?n():a instanceof Node?e[t?"removeChild":"appendChild"](a):"length"in a||a[Symbol.iterator]?(a=Array.from(a),n()):t?Object.entries(a).map((([t,a])=>e.setAttribute(t,a))):Object.assign(e,a);}function o(t){e.appendChild(document.createTextNode(t));}function r(e){for(let t;t=a[typeof e];e=t(e));}}let t={html(){return e(document.documentElement,...arguments)},head(){return e(document.head,...arguments)},body(){return e(document.body,...arguments)}};var a=new Proxy(e,{get:(a,n)=>t[n]||function(){return e(document.createElement(n),...arguments)}});class n{constructor(e){this._canvas=a.canvas(),this._context=this._canvas.getContext("2d"),this.node=a.video({onloadedmetadata:e=>{this._canvas.width=this.node.videoWidth,this._canvas.height=this.node.videoHeight;}}),this._flow=(async()=>{this._engine="BarcodeDetector"in self&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")?"barcodeDetector":"jsQR","barcodeDetector"==this._engine?this._barcodeDetector=new BarcodeDetector({formats:["qr_code"]}):(this._worker=new Worker(e),this._worker.onmessage=e=>e.data&&this.onRead(e.data.data,[this._engine,e.data]));})();}async start(e){let t={media:e};if(this._startFlow=t,await this._flow,t.end)return;this.node.srcObject=t.media;try{await this.node.play();}catch(e){if(!(e instanceof DOMException&&"AbortError"==e.name))throw e}if(t.end)return;let a=0,n=async()=>{if(t.frame=requestAnimationFrame(n),a++%10)return;this._context.drawImage(this.node,0,0);let e=this._context.getImageData(0,0,this._canvas.width,this._canvas.height);"barcodeDetector"==this._engine?(await this._barcodeDetector.detect(e)).map((e=>this.onRead(e.rawValue,[this._engine,e]))):this._worker.postMessage(e);};t.frame=requestAnimationFrame(n);}async tryResume(){this.node.paused&&await this.node.play();}end(){let e=this._startFlow;e.end=1,e.media.getTracks().map((t=>{e.media.removeTrack(t),t.stop();})),this.node.srcObject&&(this.node.srcObject=null),"frame"in e&&cancelAnimationFrame(e.frame);}}

let qrCodeScanner=new n('../export/worker.mjs');
qrCodeScanner=qrCodeScanner
;(async()=>{
    qrCodeScanner.onRead=console.log;
    doe.body(qrCodeScanner.node);
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
        throw e
    }
    await qrCodeScanner.start(media);
})();
