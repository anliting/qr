import doe from'doe'
;(async()=>{
    let mediaStream=await navigator.mediaDevices.getUserMedia(
        {video:true}
    ),video,canvas=doe.canvas(),qrWorker=new Worker('qrWorker.static.mjs')
    doe.body(
        video=doe.video({
            srcObject:mediaStream,
            onloadedmetadata:_=>{
                canvas.width=video.videoWidth
                canvas.height=video.videoHeight
            },
        }),
    )
    await video.play()
    let interval=1000,scanned=0,start=performance.now()
    let frame=()=>{
        requestAnimationFrame(frame)
        let t=performance.now()-start
        let context=canvas.getContext('2d')
        context.drawImage(video,0,0)
        if(interval*scanned<=t){
            scanned++
            qrWorker.postMessage(
                context.getImageData(
                    0,0,canvas.width,canvas.height
                )
            )
        }
    }
    requestAnimationFrame(frame)
    qrWorker.onmessage=e=>{
        console.log(e.data)
    }
})()
