const {createClient}=require("redis");
let subscriber=createClient();
async function notifyMe(){
    await subscriber.connect();
    await subscriber.SUBSCRIBE("notify-me",(data)=>{
        console.log("Received data:",data);
    });
    
}
notifyMe();




