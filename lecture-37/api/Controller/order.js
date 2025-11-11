const OrderBook = require("../../service/OrderBook");
const ob=new OrderBook("BTCUSD");
module.exports.postPlaceOrder =async (req, res) => {
    //username, price, quantity, type, side, symbol

        const { username, price, quantity, type, side, symbol } = req.body;
        // Basic validation
        if (!username || !quantity || !type || !side || !symbol) {
            return res.json({ error: "Missing required fields" });
        }
        let response=ob.placeOrder(price, quantity, type, side, username);
        console.log("Order placed:", req.body);
        res.json(response);
await publisher.connect();
await publisher.publish('book update:', JSON.stringify(req.body));

    


}