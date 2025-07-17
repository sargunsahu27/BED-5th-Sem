const fs=require("fs");
let users=[
    {id:1,name:"Alice",age:25},
    {id:2,name: "Bob",age:30},
    {id:3,name:"Charlie",age:35}
]
let usersrepeat = [
    { id:1, name: "Kavya", age: 20 },
    { id:2, name: "Sargun", age: 20 },
    { id:3, name: "Muskan", age: 24 }
];
fs.writeFile("lecture-7/users.txt",JSON.stringify(users),function(err){
    if(err) return console.log(err);
     console.log("users written");
    
})
// i want data in string format in file (users.toString())
fs.writeFile("lecture-7/users2.txt",JSON.stringify(usersrepeat),function(err){
    if(err) return console.log(err);
     console.log("users2 written");
    
})
