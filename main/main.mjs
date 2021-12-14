import doe from'doe'
let skip=60
function QrCodeScanner(workerPath){
    this._worker=new Worker(workerPath)
    this._worker.onmessage=e=>
        this.onRead(e.data)
    this._canvas=doe.canvas()
    this._context=this._canvas.getContext('2d')
    this.node=doe.video({
        onloadedmetadata:_=>{
            this._canvas.width=this.node.videoWidth
            this._canvas.height=this.node.videoHeight
        },
    })
    this._load=(async()=>{
        this.node.srcObject=await navigator.mediaDevices.getUserMedia(
            {video:true}
        )
    })()
}
QrCodeScanner.prototype.start=async function(){
    await this._load
    await this.node.play()
    let count=0,frame=()=>{
        this._frame=requestAnimationFrame(frame)
        this._context.drawImage(this.node,0,0)
        if(count++%skip==0)
            this._worker.postMessage(
                this._context.getImageData(
                    0,0,this._canvas.width,this._canvas.height
                )
            )
    }
    this._frame=requestAnimationFrame(frame)
}
QrCodeScanner.prototype.end=function(){
    cancelAnimationFrame(this._frame)
}
export default QrCodeScanner
