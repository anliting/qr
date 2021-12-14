import{rollup}from'rollup'
import core from'@anliting/core'
let dir=core.importMetaToDir(import.meta)
async function link(input,file){
    let bundle=await rollup({
        input,
        plugins:[{
            name:'doe',
            resolveId:i=>i=='doe'?'doe':null,
            load:i=>i=='doe'?
                link(`${dir}/../lib/doe/export/main.mjs`)
            :
                null,
        },{
            name:'jsQR',
            resolveId:i=>i=='jsQR'?'jsQR':null,
            load:i=>i=='jsQR'?
                link(`${dir}/../lib/jsQR/dist/jsQR.js`)
            :
                null,
        }],
    })
    return(await bundle.generate({
        file,
        format:'es',
    })).output[0].code
}
export default link
