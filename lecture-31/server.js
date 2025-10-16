const {WebSocketServer} = require('ws');
const wss=new WebSocketServer({port:8080});

//rooms functionality
let rooms=new Map();
// {
//     "1234": Set(1,2,3)
// }
wss.on('connection',function(socket){
    console.log('a new user connected');
    socket.on('message',function(message){
        //{type:join||chat,payload:{roomId:value}}
        let parseMessage=JSON.parse(message);
        if(parseMessage.type==="join"){
            let roomId=parseMessage.payload.roomId;
            if(!rooms.get(roomId)){
                rooms.set(roomId,new Set());
            }
            rooms.get(roomId).add(socket);
            socket.send("you are added to room "+roomId.toString());
            console.log(rooms);

        }
        else if(parseMessage.type==="chat"){    
            let roomId=parseMessage.payload.roomId;
            let chatMessage=parseMessage.payload.message;
           let allclients= rooms.get(roomId);
           allclients.forEach(s=>{
            s.send(message);
           })
        }
    })
})