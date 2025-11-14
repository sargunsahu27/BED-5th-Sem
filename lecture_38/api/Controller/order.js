const OrderBook = require("../service/orderbook");
let publisher = require("../../shared").publisher;

module.exports.postPlaceOrder = async (req, res) => {
    const { price, quantity, type, side, symbol } = req.body;
    const username = req.user.username;

    if (!quantity || !type || !side || !symbol) {
        return res.json({ error: "Missing required fields" });
    }

    let ob = OrderBook.getOrderBook(symbol);
    let response = ob.placeOrder(price, quantity, type, side, username, symbol);

    await publisher.publish("book:Update", JSON.stringify(response.book));
    res.json(response);
};
