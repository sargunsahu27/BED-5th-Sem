const fs=require("fs");
const {read} = require("../IO/io.js");
const {write} = require("../IO/io.js");

async function readusers(){
    let users= await read("../users.txt");
    let users2= await read("../users2.txt");
    console.log(users); 
    console.log(users2); 
}
readusers();
async function writeusers(){
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
    await write("../users.txt",users);
    await write("../users2.txt",usersrepeat);
    console.log("users written");
}
 writeusers();
// fs.readFile("lecture-7/users.txt", "utf-8", (err, data) => {
//     if (err) return console.log(err);
//     // console.log("Data read from file:", data);
//     // console.log(data[0]); // Accessing the first character of the string
//     let users=JSON.parse(data);// changing json data to object
//     console.log(users[0]); // Accessing the name of the first user 
// });

    
// we have to make an promise to avoid writing multiple readFile and writeFile
// async/await can also be used for better readability and error handling
// or even use async/await for a more synchronous style of coding.