import fs from'fs'
import link from'./link.mjs'
import minify from'./minify.mjs'
;(async()=>{
    await Promise.all([
        (async()=>
            fs.promises.writeFile(
                'export/main.mjs',
                await link('main/main.mjs').then(minify)
            )
        )(),
        (async()=>
            fs.promises.writeFile(
                'export/worker.mjs',
                await link('main/worker.mjs').then(minify)
            )
        )(),
    ])
    await fs.promises.writeFile(
        'main/test.static.mjs',
        await link('main/test.mjs')
    )
})()
