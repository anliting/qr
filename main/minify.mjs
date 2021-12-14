import gcc from'google-closure-compiler'
export default js=>new Promise((rs,rj)=>
    (new gcc.compiler({
        compilation_level:'ADVANCED',
        chunk_output_type:'ES_MODULES',
        js,
    })).run((exitCode,stdOut,stdErr)=>
        exitCode?rj(stdErr):rs(stdOut.replace('\n',''))
    )
)
