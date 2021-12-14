function doe(e){let t=0,n={function:t=>t(e),number:o,object:r,string:d};return c([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(c);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function d(t){e.appendChild(document.createTextNode(t));}function c(e){for(let t;t=n[typeof e];e=t(e));}}let method={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var main = new Proxy(doe,{get:(e,t)=>method[t]||function(){return doe(document.createElement(t),...arguments)}});

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
    this._load=(async()=>{
        this.node.srcObject=await navigator.mediaDevices.getUserMedia(
            {video:true}
        );
    })();
}
QrCodeScanner.prototype.start=async function(){
    await this._load;
    await this.node.play();
    let interval=1000,scanned=0,start=performance.now();
    let frame=()=>{
        this._frame=requestAnimationFrame(frame);
        let t=performance.now()-start;
        this._context.drawImage(this.node,0,0);
        if(interval*scanned<=t){
            scanned++;
            console.log(scanned);
            this._worker.postMessage(
                this._context.getImageData(
                    0,0,this._canvas.width,this._canvas.height
                )
            );
        }
    };
    this._frame=requestAnimationFrame(frame);
};
QrCodeScanner.prototype.end=function(){
    cancelAnimationFrame(this._frame);
};

export { QrCodeScanner as default };
