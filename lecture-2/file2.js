let file3=require("./file3.js");
let result=file3.add(5,6);
let res=file3.mul(7,8);
console.log(result);
console.log(res);
// function mul(a,b){
//     return a*b;
// }
function div(a,b){
    return a/b;
}
// module.exports.mul=mul;
module.exports.div=div;