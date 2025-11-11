const OrderBook = require("../service/orderbook");
const ob=new OrderBook("BTCUSD");
let publisher=require("../../shared").publisher;
module.exports.postPlaceOrder =async (req, res) => {
    //username, price, quantity, type, side, symbol

        const { username, price, quantity, type, side, symbol } = req.body;
        // Basic validation
        if (!username || !quantity || !type || !side || !symbol) {
            return res.json({ error: "Missing required fields" });
        }
        let response=ob.placeOrder(price, quantity, type, side, username);
await publisher.connect();
await publisher.publish("book:Update",JSON.stringify(response.book));
        res.json(response);


    


}