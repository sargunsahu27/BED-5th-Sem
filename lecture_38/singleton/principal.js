class principal {
     principalins=new Map();
    _constructor(school) {
       this.school=school;
    }
    static getprincipal(){
        if(!principalins.get(school)){
            let principall=new principal(school);
            principalins.set(school,principall);
        }
        return principalins.get(school);
    }
    resticate(name) {
    
    }
    suspend(name) {

    }
    removesunpension(name) {

    }
    notify(name) {

    }
}
 module.exports=principal;