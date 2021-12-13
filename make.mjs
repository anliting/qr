import fs from'fs'
import link from'./link.mjs'
import minify from'./minify.mjs'
;(async()=>{
    fs.promises.writeFile(
        'main.static.mjs',
        await minify(await link('main.mjs'))
    )
})()
