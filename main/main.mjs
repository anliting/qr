import doe from'doe'
let skip=10
export default class{
    constructor(workerPath){
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
                'BarcodeDetector'in self&&(
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
                    e.data&&this.onRead(
                        e.data.data,
                        [this._engine,e.data]
                    )
            }
        })()
    }
    async start(media){
        let flow={media}
        this._startFlow=flow
        await this._flow
        if(flow.end)
            return
        this.node.srcObject=flow.media
        try{
            await this.node.play()
        }catch(e){
            if(!(e instanceof DOMException&&e.name=='AbortError'))
                throw e
        }
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
                    this.onRead(a.rawValue,[this._engine,a])
                )
            else
                this._worker.postMessage(imageData)
        }
        flow.frame=requestAnimationFrame(frame)
    }
    async tryResume(){
        if(this.node.paused)
            await this.node.play()
    }
    end(){
        let flow=this._startFlow
        flow.end=1
        flow.media.getTracks().map(track=>{
            flow.media.removeTrack(track)
            track.stop()
        })
        if(this.node.srcObject)
            this.node.srcObject=null
        if('frame'in flow)
            cancelAnimationFrame(flow.frame)
    }
}
