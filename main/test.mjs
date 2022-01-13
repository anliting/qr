import doe from'doe'
import QrCodeScanner from'../export/main.mjs'
let qrCodeScanner=new QrCodeScanner('../export/worker.mjs')
;(async()=>{
    doe.body(qrCodeScanner.node)
    console.log(await navigator.mediaDevices.enumerateDevices())
    let media
    try{
        media=await navigator.mediaDevices.getUserMedia(
            {video:{facingMode:'environment'}}
        )
    }catch(e){
        console.log(e.name,e)
        // NotAllowedError NotFoundError
        throw e
    }
    await qrCodeScanner.start(media)
    qrCodeScanner.onRead=console.log
    self.qrCodeScanner=qrCodeScanner
})()
