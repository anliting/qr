import{rollup}from'rollup'
import core from'@anliting/core'
import commonjs from'@rollup/plugin-commonjs'
import typescript from'@rollup/plugin-typescript'
let dir=core.importMetaToDir(import.meta)
async function link(input,file){
    let bundle=await rollup({
        input,
        plugins:[commonjs(),typescript(),{
            name:'doe',
            resolveId:i=>i=='doe'?'doe':null,
            load:i=>i=='doe'?
                link(`${dir}/doe/export/main.mjs`)
            :
                null,
        },{
            name:'jsQR',
            resolveId:i=>i=='jsQR'?'jsQR':null,
            load:i=>i=='jsQR'?
                link(`${dir}/jsQR/src/index.ts`)
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
