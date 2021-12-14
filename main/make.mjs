// PATH="/usr/lib/jvm/java-17-openjdk/bin/:$PATH" node 
import fs from'fs'
import link from'./link.mjs'
import minify from'./minify.mjs'
;(async()=>{
    await fs.promises.writeFile(
        'main/a.static.mjs',
        await link('main/a.mjs')
    )
    console.log(
        await minify('main/a.static.mjs')
    )
    /*await fs.promises.writeFile(
        'main/main.static.mjs',
        await link('main/main.mjs')
    )
    await fs.promises.writeFile(
        'main/qrWorker.static.mjs',
        await link('main/qrWorker.mjs')
    )
    await fs.promises.writeFile(
        'export/main.mjs',
        await minify('main/main.static.mjs')
    )
    await fs.promises.writeFile(
        'export/qrWorker.mjs',
        await minify('main/qrWorker.static.mjs')
    )
    await fs.promises.writeFile(
        'main/test.static.mjs',
        await link('main/test.mjs')
    )*/
})()
