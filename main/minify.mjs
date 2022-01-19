import{minify}from'terser'
export default async s=>(await minify(s,{
    format:{comments:false},
    toplevel:true
})).code
