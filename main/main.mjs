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
QrCodeScanner.prototype.start=async function(){
    let flow={}
    this._startFlow=flow
    await this._flow
    if(flow.end)
        return
    flow.media=await navigator.mediaDevices.getUserMedia(
        {video:{facingMode:'environment'}}
    )
    if(flow.end)
        return
    this.node.srcObject=flow.media
    await this.node.play()
    if(flow.end)
        return
    let count=0,frame=async()=>{
        flow.frame=requestAnimationFrame(frame)
        if(count++%skip)
            return
        this._context.drawImage(this.node,0,0)
        let imageData=this._context.getImageData(
            0,0,this._canvas.width,this._canvas.height
        )
        if(this._engine=='barcodeDetector')
            (await this._barcodeDetector.detect(imageData)).map(a=>
                this.onRead(a.rawValue)
            )
        else
            this._worker.postMessage(imageData)
    }
    flow.frame=requestAnimationFrame(frame)
}
QrCodeScanner.prototype.end=function(){
    this._startFlow.end=1
    if('media'in this._startFlow)
        this._startFlow.media.getTracks().map(track=>{
            this._startFlow.media.removeTrack(track)
            track.stop()
        })
    if(this.node.srcObject)
        this.node.srcObject=null
    if('frame'in this._startFlow)
        cancelAnimationFrame(this._startFlow.frame)
}
export default QrCodeScanner
