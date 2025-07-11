// Promise is an object which represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
let account_balance= 16000;
let products=[
    {
        name:"samsung",
        amount:70000,
        quantity:10
    },
     {
        name:"Iphone 16",
        amount:10000,
        quantity:1
    }
]

function buyProduct(product_name){
   return new Promise((resolve, reject)=>{
    let isproduct = null;
    // console.log(isproduct);
    //implement for loop to find product in an array
    //find product object from product array who's name is equal to product array
    for(let i = 0; i < products.length ;i++){
        // console.log(products[i].name==product_name);      
        if(products[i].name==product_name){
            isproduct = products[i];
            
        }  
    }
    if(!isproduct){
        reject("product is not available");
    }else{
        resolve(isproduct);
    }
})
}
function deductAmount(amount){
   return new Promise((resolve, reject)=>{
    
    if (account_balance < amount){
       reject("balance is too low to purchase");
    }else{
        account_balance -= amount;
        resolve("product purchased");
    }
        
   
});
}
// // buyProduct("Iphone 16")
// // .then((data)=>{
// //     console.log(data);
    
// // })
// // .catch((err)=>{
// //     console.log(err);
// // })
// buyProduct("Iphone 16")
//   .then((product) => {
//     console.log("Product available:", product.name, "for Rs.", product.amount);
//     return deductAmount(product.amount); // now you're passing the correct amount
//   })
// .then((message )=>{ 
//    console.log(message); 
//    console.log(account_balance);   
// })
// .catch((err)=>{
//     console.log(err);
// })


// // deductAmount(10000)
// // .then((data)=>{
// //     console.log(data);
// //     console.log(account_balance);
// // })
// // .catch((err)=>{
// //     console.log(err);
// // })
// // console.log("end");  
async function myfun(){
   try{
let amount=await buyProduct("Iphone 16")
let message = await deductAmount(amount)
console.log(amount);
console.log(message);
}
catch (err) {
    console.error(err);
}
}
console.log(myfun());
console.log("start");
console.log("end");

// jab tak promise resolve hoyega tab tak agla code nhi chalega 