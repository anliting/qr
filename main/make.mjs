// PATH="/usr/lib/jvm/java-17-openjdk/bin/:$PATH" node 
import fs from'fs'
import link from'./link.mjs'
import minify from'./minify.mjs'
;(async()=>{
    await fs.promises.writeFile(
        'main/qrWorker.static.mjs',
        await link('main/qrWorker.mjs')
    )
    await fs.promises.writeFile(
        'main/main.static.mjs',
        await link('main/main.mjs')
    )
    /*await fs.promises.writeFile(
        'main.static.min.mjs',
        await minify()
    )*/
})()
