import doe from'doe'
let skip=10
function QrCodeScanner(workerPath){
    this._canvas=doe.canvas()
    this._context=this._canvas.getContext('2d')
    this.node=doe.video({
        onloadedmetadata:_=>{
            this._canvas.width=this.node.videoWidth
            this._canvas.height=this.node.videoHeight
        },
    })
    this._flow=(async()=>{
        this._engine=
            'BarcodeDetector' in self&&(
                await BarcodeDetector.getSupportedFormats()
            ).includes('qr_code')
        ?
            'barcodeDetector'
        :
            'jsQR'
        if(this._engine=='barcodeDetector')
            this._barcodeDetector=new BarcodeDetector({
                formats:['qr_code']
            })
        else{
            this._worker=new Worker(workerPath)
            this._worker.onmessage=e=>
                this.onRead(e.data)
        }
    })()
}
QrCodeScanner.prototype.start=function(){
    return this._flow=(async()=>{
        await this._flow
        this.node.srcObject=this._stream=
            await navigator.mediaDevices.getUserMedia(
                {video:{facingMode:'environment'}}
            )
        await this.node.play()
        let count=0,frame=async()=>{
            this._context.drawImage(this.node,0,0)
            if(count++%skip)
                return
            let imageData=this._context.getImageData(
                0,0,this._canvas.width,this._canvas.height
            )
            if(this._engine=='barcodeDetector')
                (await this._barcodeDetector.detect(imageData)).map(a=>
                    this.onRead(a.rawValue)
                )
            else
                this._worker.postMessage(imageData)
            this._frame=requestAnimationFrame(frame)
        }
        this._frame=requestAnimationFrame(frame)
    })()
}
QrCodeScanner.prototype.end=function(){
    return this._flow=(async()=>{
        await this._flow
        cancelAnimationFrame(this._frame)
        this._stream.getTracks().map(track=>{
            this.node.srcObject.removeTrack(track)
            track.stop()
        })
    })()
}
export default QrCodeScanner
