function doe(e){let t=0,n={function:t=>t(e),number:o,object:r,string:d};return c([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(c);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function d(t){e.appendChild(document.createTextNode(t));}function c(e){for(let t;t=n[typeof e];e=t(e));}}let method={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var doe$1 = new Proxy(doe,{get:(e,t)=>method[t]||function(){return doe(document.createElement(t),...arguments)}});

function e(e){let t=0,n={function:t=>t(e),number:a,object:i,string:o};return r([...arguments].slice(1)),e;function a(e){t=e;}function i(n){function a(){n.map(r);}n instanceof Array?a():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),a()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function o(t){e.appendChild(document.createTextNode(t));}function r(e){for(let t;t=n[typeof e];e=t(e));}}let t={html(){return e(document.documentElement,...arguments)},head(){return e(document.head,...arguments)},body(){return e(document.body,...arguments)}};var n=new Proxy(e,{get:(n,a)=>t[a]||function(){return e(document.createElement(a),...arguments)}});class a{constructor(e){this._canvas=n.canvas(),this._context=this._canvas.getContext("2d"),this.node=n.video({onloadedmetadata:e=>{this._canvas.width=this.node.videoWidth,this._canvas.height=this.node.videoHeight;},playsInline:!0}),this._flow=(async()=>{this._engine=("BarcodeDetector"in self&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code"),"jsQR"),"barcodeDetector"==this._engine?this._barcodeDetector=new BarcodeDetector({formats:["qr_code"]}):this._worker=n(new Worker(e),{onerror:e=>this.onError(e),onmessage:e=>e.data&&this.onRead(e.data.data,[this._engine,e.data])});})();}async start(e){let t={media:e};if(this._startFlow=t,await this._flow,t.end)return;this.node.srcObject=t.media;try{await this.node.play();}catch(e){if(!(e instanceof DOMException&&"AbortError"==e.name))throw e}if(t.end)return;let n=0,a=async()=>{if(t.frame=requestAnimationFrame(a),n++%10)return;this._context.drawImage(this.node,0,0);let e=this._context.getImageData(0,0,this._canvas.width,this._canvas.height);"barcodeDetector"==this._engine?(await this._barcodeDetector.detect(e)).map((e=>this.onRead(e.rawValue,[this._engine,e]))):this._worker.postMessage(e);};t.frame=requestAnimationFrame(a);}async tryResume(){this.node.paused&&await this.node.play();}end(){let e=this._startFlow;e.end=1,this.node.srcObject&&(this.node.srcObject=null),"frame"in e&&cancelAnimationFrame(e.frame);}}

let qrCodeScanner=doe$1(new a('../export/worker.mjs'),{
    onError:console.error,
    onRead:console.log,
});
doe$1.body(qrCodeScanner.node)
;(async()=>{
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
