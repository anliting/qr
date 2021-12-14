function doe(e){let t=0,n={function:t=>t(e),number:o,object:r,string:d};return c([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(c);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function d(t){e.appendChild(document.createTextNode(t));}function c(e){for(let t;t=n[typeof e];e=t(e));}}let method={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var main = new Proxy(doe,{get:(e,t)=>method[t]||function(){return doe(document.createElement(t),...arguments)}});

let skip=60;
function QrCodeScanner(workerPath){
    this._worker=new Worker(workerPath);
    this._worker.onmessage=e=>
        this.onRead(e.data);
    this._canvas=main.canvas();
    this._context=this._canvas.getContext('2d');
    this.node=main.video({
        onloadedmetadata:_=>{
            this._canvas.width=this.node.videoWidth;
            this._canvas.height=this.node.videoHeight;
        },
    });
}
QrCodeScanner.prototype.start=async function(){
    this.node.srcObject=await navigator.mediaDevices.getUserMedia(
        {video:{facingMode:'environment'}}
    );
    await this.node.play();
    let count=0,frame=()=>{
        this._frame=requestAnimationFrame(frame);
        this._context.drawImage(this.node,0,0);
        if(count++%skip==0)
            this._worker.postMessage(
                this._context.getImageData(
                    0,0,this._canvas.width,this._canvas.height
                )
            );
    };
    this._frame=requestAnimationFrame(frame);
};
QrCodeScanner.prototype.end=function(){
    cancelAnimationFrame(this._frame);
};

export { QrCodeScanner as default };
