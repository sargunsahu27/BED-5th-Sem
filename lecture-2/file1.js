let file3=require("./file3.js")
// console.log(file3);
let result=file3.mul(2,3);
// function add(a,b){
//     return a+b;
// }
console.log(result)
function sub(a,b){
    return a-b;
}
// module.exports.add=add;
module.exports.sub=sub;