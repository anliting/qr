import jsQR from'jsQR'
self.onmessage=e=>
    postMessage(jsQR(e.data.data,e.data.width,e.data.height))
