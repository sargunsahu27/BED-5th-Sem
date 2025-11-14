const {createClient} = require('redis');
let publisher=createClient();
let subscriber=createClient();

subscriber.connect().then(()=>{
    console.log("Subscriber connected to Redis");
})
publisher.connect().then(()=>{
    console.log("Publisher connected to Redis");
});
module.exports={publisher,subscriber};