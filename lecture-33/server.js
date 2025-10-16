const express = require("express");
const app = express();
const { createClient } =require("redis");
const client = createClient();

async function connectRedis(){
    await client.connect();
    
    client.on("error",function(errr){
        console.log("redis error",errr);
    })
}// local host se connect hoga 6379
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// connectRedis()
// .then(()=>{
//     app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
// })


async function cachedData(){
    await client.connect();
    await client.set("user:100",JSON.stringify([
        {
            name:"Sargun",
            age:20
        }])
)};
// cachedData()
// .then(()=>{
//     console.log("data cached successfully");
// })
function readUser(){
    client.connect();
    // client.get("user:100");
    // return client.get("user:100");
    let user= client.get("user:100");
    return user;


}

readUser()
.then((data)=>{
    console.log("data from redis cache",data);
})
.catch((err)=>{
    console.log("error in fetching data from redis cache",err);
})



// get->server->redis->postgres->redis->server->client
// set->server->postgres->redis
// delete->server->postgres->redis

app.get("/profile",(req,res)=>{
    
})


