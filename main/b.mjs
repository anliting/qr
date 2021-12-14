export default new Proxy({
    get(obj,prop){
        if(prop=='a')
            return 5
    }
})
