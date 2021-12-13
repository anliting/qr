import gcc from 'google-closure-compiler'
export default()=>new Promise((rs,rj)=>{
    let closureCompiler=new gcc.compiler({
        js:'main.static.mjs',
        compilation_level:'ADVANCED',
    }),compilerProcess=closureCompiler.run((exitCode,stdOut,stdErr)=>{
        rs(stdOut)
    })
})
