// PATH="/usr/lib/jvm/java-17-openjdk/bin/:$PATH" node 
import fs from'fs'
import link from'./link.mjs'
import minify from'./minify.mjs'
;(async()=>{
    await fs.promises.writeFile(
        'main.static.mjs',
        await link('main.mjs')
    )
    await fs.promises.writeFile(
        'main.static.min.mjs',
        await minify()
    )
})()
