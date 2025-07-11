// let account_balance = 300000;
// let products = [
//     {
//         name: "samsung",
//         amount: "70000",
//         quantity: 10
//     },
//     {
//         name: "Iphone 16",
//         amount: "100000",
//         quantity: 10
//     }
// ];
// // function buyProduct(product_name,cb){
// //     //some asynchronous operation
// //     //1. get product details from product db
// //     //2. write user details in user db
// //     setTimeout(()=>{
// //         console.log("order complete");
// //         cb();
// //     })
// // }

// buyProduct("Iphone 16",function(err,amount){
//     // console.log("product is purchased");
//     if(err)return console.log(err)
//     // console.log(amount)
//     deductAmount(amount,function(err,message){
//         if(err) return console.log(err);
//         console.log(message)
//     });
// })
// //console.log("product is purchased");
// function buyProduct(product_name,cb){
//     let isproduct = null;
//     // console.log(isproduct);
//     //implement for loop to find product in an array
//     //find product object from product array who's name is equal to product array
//     for(let i = 0; i < products.length ;i++){
//         // console.log(products[i].name==product_name);      
//         if(products[i].name==product_name){
//             isproduct = products[i];
//             break;
//         }  
//     }
//     if(!isproduct){
//         cb("product is not available",null)
//     }else{
//         cb(null,Number(isproduct.amount));
//     }
// }

// function deductAmount(amount , cb){
//     if (account_balance >= amount){
//         account_balance -= amount;
//         console.log(account_balance)
//         console.log("product purchased");
//         cb(null,account_balance);
//     }else{
//         cb("balance is too low to purchase",null);
//     }
// }

// //problem in calkback
// //1. callback hell - is nested call back and reduce readibility and difficult to manage 
// // and also inversion of call happens
// //promise resolve this!


let account_balance= 200000000;
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

// function buyProduct(product_name,cb){
//     //some asynchronous operation
//     //1. get product detaile from product db
//     //2. write order detail in user db
//     setTimeout(()=>{
//         console.log("order complete");
//         cb();
//     })
// }


// console.log("product is purchased")
function buyProduct(product_name,cb){
 let isproduct =null
 //implement for loop to find product in an array
 //find product object from product array who's name is eual to product_name
 for(let i =0 ; i<products.length;i++){
    // console.log( products[i].name==product_name);
    if(products[i].name==product_name){
        isproduct=products[i];
    }
 }
 if(!isproduct){
    cb("product is not available",null)
 }else{
    cb(null,isproduct.amount);

 }
}

function deductAmount(amount,cb){
    if(amount>account_balance){
        cb("your account balanace is low",null)
    }else{
        account_balance-=amount;
        cb(null,"your product is purchased")
        
    }

}


buyProduct("Iphone 16",function(err,amount){
    // console.log("product is purchased");
    if(err) return console.log(err)
        console.log(amount)
    deductAmount(amount,function(err,message){
            if(err) return console.log(err);
            console.log(message)
            console.log(account_balance)
    });

})

//problems in callback
//1. callback hell;
//2. dont have control on your own code;