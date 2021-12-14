function doe(n){
    let
        state=0,
        p={
            function:f=>f(n),
            number,
            object,
            string,
        };
    transform([...arguments].slice(1));
    return n
    function number(n){
        state=n;
    }
    function object(o){
        if(o instanceof Array)
            array();
        else if(o instanceof Node)
            n[state?'removeChild':'appendChild'](o);
        else if(('length' in o)||o[Symbol.iterator]){
            o=Array.from(o);
            array();
        }else if(state)
            Object.entries(o).map(([a,b])=>n.setAttribute(a,b));
        else
            Object.assign(n,o);
        function array(){
            o.map(transform);
        }
    }
    function string(s){
        n.appendChild(document.createTextNode(s));
    }
    function transform(t){
        for(let q;q=p[typeof t];t=q(t));
    }
}
let methods={
    html(){
        return doe(document.documentElement,...arguments)
    },
    head(){
        return doe(document.head,...arguments)
    },
    body(){
        return doe(document.body,...arguments)
    },
};
var main = new Proxy(doe,{
    get:(t,p)=>methods[p]||function(){
        return doe(document.createElement(p),...arguments)
    }
});

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
