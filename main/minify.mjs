import{minify}from'terser'
import gcc from'google-closure-compiler'
export default{
    module:async s=>(await minify(s)).code,
    script:js=>new Promise((rs,rj)=>
        (new gcc.compiler({
            compilation_level:'ADVANCED',
            js,
        })).run((exitCode,stdOut,stdErr)=>
            exitCode?rj(stdErr):rs(stdOut.replace('\n',''))
        )
    )
}
