let {WebSocketServer}=require("ws");
const { all } = require("../api/Routes/order");
let wss=new WebSocketServer({port:5002});
let subscriber=require("../shared").subscriber;
let allsockets=[];







wss.on("connection",(socket)=>{
    console.log("New client connected");
    allsockets.push(socket);
    async function bookupdate(){

        subscriber.subscribe("book:Update", (message)=>{
            // console.log("Received book update:",message);
            broadcast(message);

        });
    }
    bookupdate();
});
function broadcast(data){
    allsockets.forEach((s)=>{
        s.send(data);
    });
}