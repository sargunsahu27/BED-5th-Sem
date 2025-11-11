let {WebSocketServer}=require("ws");
let wss=new WebSocketServer({port:5002});
let subscriber=require("../shared").subscriber;








wss.on("connection",(socket)=>{
    console.log("New client connected");
    async function bookupdate(){
        await subscriber.connect();
        subscriber.subscribe("book:Update", (message)=>{
            console.log("Received book update:",message);

        });
    }
    bookupdate();
});