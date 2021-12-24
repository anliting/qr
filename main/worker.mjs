import jsQR from'jsQR'
self.onmessage=e=>{
    let r=jsQR(e.data.data,e.data.width,e.data.height)
    if(r)
        postMessage(r.data)
}
