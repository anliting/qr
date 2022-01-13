import doe from'doe'
import QrCodeScanner from'../export/main.mjs'
let qrCodeScanner=new QrCodeScanner('../export/worker.mjs')
;(async()=>{
    doe.body(qrCodeScanner.node)
    let media
    try{
        media=await navigator.mediaDevices.getUserMedia(
            {video:{facingMode:'environment'}}
        )
    }catch(e){
        if(e.name=='NotAllowedError')
            return alert('The camera is blocked. Please allow the use of your camera and refresh.')
        if(e.name=='NotFoundError')
            return alert('No camera is found. Please attach a camera to your device and refresh.')
    }
    await qrCodeScanner.start(media)
    qrCodeScanner.onRead=console.log
    self.qrCodeScanner=qrCodeScanner
})()
