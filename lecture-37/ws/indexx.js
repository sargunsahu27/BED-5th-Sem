const wss=require("ws");
const { subscribe } = require("../api/routes/orderRoute");
wss.on("connection",(socket)=>{
    console.log("New client connected");
    async function bookupdate(){
        await subscribe.connect();
        subscriber.subscribe('book update:',(message)=>{
            console.log("Message received: book update",message);
        });
    }
    bookupdate();
});
