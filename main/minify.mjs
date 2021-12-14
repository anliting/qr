import gcc from 'google-closure-compiler'
export default()=>new Promise((rs,rj)=>
    (new gcc.compiler({
        js:'main.static.mjs',
        compilation_level:'ADVANCED',
    })).run((exitCode,stdOut,stdErr)=>
        exitCode?rj(stdErr):rs(stdOut.replace('\n',''))
    )
)
