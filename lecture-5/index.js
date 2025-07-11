let p=new Promise ((resolve, reject) => {
    let age=18;
    if(age>=18) return resolve("You are eligible to vote");    
    reject("You are not eligible to vote");

}); 
p  
.then((data)=>{
    console.log(data);
    
})  
.catch((err)=>{
    console.log(err);
})
console.log("ok");
console.log("hii");

function sum(a,b){
    return a+b;
}
sum(2,3);
console.log("end");

