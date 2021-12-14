function doe(e){let t=0,n={function:t=>t(e),number:o,object:r,string:d};return c([...arguments].slice(1)),e;function o(e){t=e;}function r(n){function o(){n.map(c);}n instanceof Array?o():n instanceof Node?e[t?"removeChild":"appendChild"](n):"length"in n||n[Symbol.iterator]?(n=Array.from(n),o()):t?Object.entries(n).map((([t,n])=>e.setAttribute(t,n))):Object.assign(e,n);}function d(t){e.appendChild(document.createTextNode(t));}function c(e){for(let t;t=n[typeof e];e=t(e));}}let methods={html(){return doe(document.documentElement,...arguments)},head(){return doe(document.head,...arguments)},body(){return doe(document.body,...arguments)}};var main = new Proxy(doe,{get:(e,t)=>methods[t]||function(){return doe(document.createElement(t),...arguments)}});

(async()=>{
    let mediaStream=await navigator.mediaDevices.getUserMedia(
        {video:true}
    ),video,canvas=main.canvas(),qrWorker=new Worker('qrWorker.static.mjs');
    main.body(
        video=main.video({
            srcObject:mediaStream,
            onloadedmetadata:_=>{
                canvas.width=video.videoWidth;
                canvas.height=video.videoHeight;
            },
        }),
    );
    await video.play();
    let interval=1000,scanned=0,start=performance.now();
    let frame=()=>{
        requestAnimationFrame(frame);
        let t=performance.now()-start;
        let context=canvas.getContext('2d');
        context.drawImage(video,0,0);
        if(interval*scanned<=t){
            scanned++;
            qrWorker.postMessage(
                context.getImageData(
                    0,0,canvas.width,canvas.height
                )
            );
        }
    };
    requestAnimationFrame(frame);
    qrWorker.onmessage=e=>{
        console.log(e.data);
    };
})();
