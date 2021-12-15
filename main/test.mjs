import doe from'doe'
import QrCodeScanner from'../export/main.mjs'
let qrCodeScanner=new QrCodeScanner('../export/qrWorker.mjs')
;(async()=>{
    doe.body(qrCodeScanner.node)
    await qrCodeScanner.start()
    qrCodeScanner.onRead=console.log
})()
