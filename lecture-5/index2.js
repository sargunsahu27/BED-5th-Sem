// const { use } = require("react");

// let p=new Promise((resolve, reject)=>{
//    resolve("okay")
// });
// p.then((data)=>{
//     console.log(data);
//     console.log("promise completed");
// }).catch((err)=>{
//     console.log(err);
// });
// console.log(p);
let users=[{
    id:1,
    name:"Sargun",
    age:20
},{
    id:2,
    name:"mcjks",
    age:17
},{
    id:3,
    name:"kavya",
    age:19
}]
function isEligible(id){
    // find user in db 
    // check age is greater than 18 or equal to 18
    // if else
    return new Promise((resolve, reject)=>{
        
    
    let user=users.filter((user)=> user.id===id)[0];
    console.log(user);
    if(user.length===0) return reject("User not found");// promise.reject
    if(user.age>=18) 
        {
            return resolve ("User is eligible to vote");
        }
    else {
        return reject ("User is not eligible to vote");
    }
    });
        
}
isEligible(1).then((data)=>{
    console.log(data); 
}).catch((err)=>{
    console.log(err);       
})
console.log(isEligible(1))
console.log("hii")
console.log("byee");

