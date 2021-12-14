import doe from'doe'
import QrCodeScanner from'../export/main.mjs'
let qrCodeScanner=new QrCodeScanner('qrWorker.static.mjs')
;(async()=>{
    doe.body(qrCodeScanner.node)
    await qrCodeScanner.start()
})()
