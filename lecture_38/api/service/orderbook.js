class OrderBook {
    static orderbookmanager= new Map();
    constructor(symbol) {
        this.symbol = symbol;
        this.bids = [];
        this.asks = [];
        this.currentPrice = null;
        this.trades = [];
    }
    static getOrderBook(symbol) {
    if(!OrderBook.orderbookmanager.get(symbol)){
        let orderbook=new OrderBook(symbol);
        OrderBook.orderbookmanager.set(symbol,orderbook);
    }
    return OrderBook.orderbookmanager.get(symbol);
    }

    _sort(side) {
        if (side == "BUY") {
            this.bids.sort((a, b) => {
                if (a.price != b.price) {
                    return b.price - a.price; 
                }
                return a.timestamp - b.timestamp; 
            });
        } else if (side == "SELL") {
            this.asks.sort((a, b) => {
                if (a.price != b.price) {
                    return a.price - b.price; 
                }
                return a.timestamp - b.timestamp;
            });
        }
    }

    placeOrder(price, quantity, type, side, username,symbol) {
        let ob=OrderBook.orderbookmanager.get(symbol);
        let newOrder = {
            symbol: ob.symbol,
            orderId: Math.floor(Math.random() * 1000000),
            side: side,
            type: type,
            price: parseFloat(price) || null,
            originalQuantity: quantity,
            executedQuantity: 0,
            remainingQuantity: quantity,
            user: username,
            timestamp: Date.now()
        };
let trades = [];
        if (newOrder.type == "LIMIT") {
            let [order,trade] = this._LimitMatch(newOrder,trades);
            if(trade){
              this.trades=[...this.trades,...trade];
            }
            if (order.remainingQuantity > 0) {
                if (order.side == "BUY") {
                    this.bids.push(order);
                } else {
                    this.asks.push(order);
                }
                this._sort(newOrder.side);
            }
            return{book:this.getBookSnapShot(),trade};
        } else if (newOrder.type == "MARKET") {

            let [order,trade] = this._marketMatch(newOrder,trades);
            if(trade){
              this.trades=[...this.trades,...trade];
            }
            if (order.remainingQuantity > 0) {
                console.log("Order partially filled: " + order.executedQuantity + ", Cancelled: " + order.remainingQuantity);
            } else {
                console.log("Order fully filled: " + order.executedQuantity);
            }
            return{book:this.getBookSnapShot(),trade};

        }
        return{book:this.getBookSnapShot(),trades:this.getlatestTrades()};
    }

    _LimitMatch(order,trade) {
        if (order.side == "BUY") {

            let askArr = this.asks;
            while (order.remainingQuantity > 0 && askArr.length > 0) {
                let top = askArr[0];
                if (order.price >= top.price) {
                    let buyQuantity = Math.min(top.remainingQuantity, order.remainingQuantity);
                    this.currentPrice = top.price;
                    
                    order.executedQuantity += buyQuantity;
                    order.remainingQuantity -= buyQuantity;
                    trade.push([top.price,buyQuantity]);

                    top.executedQuantity += buyQuantity;
                    top.remainingQuantity -= buyQuantity;

                    if (top.remainingQuantity == 0) {
                        askArr.shift();
                    }
                } else {
                    break;
                }
            }
            return [order,trade];
        } else if (order.side == "SELL") {

            let bidArr = this.bids;
            while (order.remainingQuantity > 0 && bidArr.length > 0) {
                let top = bidArr[0]; 

                if (order.price <= top.price) {
                    let sellQuantity = Math.min(top.remainingQuantity, order.remainingQuantity);
                    this.currentPrice = top.price;

                    order.executedQuantity += sellQuantity;
                    order.remainingQuantity -= sellQuantity;
                    trade.push([top.price,sellQuantity]);

                    top.executedQuantity += sellQuantity;
                    top.remainingQuantity -= sellQuantity;

                    if (top.remainingQuantity == 0) {
                        bidArr.shift();
                    }
                } else {
                    break;
                }
            }
            return [order,trade];
        } else {
            return "Invalid order side";
        }
    }


    _marketMatch(order,trade) {
        if (order.side == "BUY") {
            let askArr = this.asks;
            while (order.remainingQuantity > 0 && askArr.length > 0) {
                let top = askArr[0];
                let filledQty = Math.min(order.remainingQuantity, top.remainingQuantity);
                this.currentPrice = top.price; 
                trade.push([top.price,filledQty]);

                order.executedQuantity += filledQty;
                order.remainingQuantity -= filledQty;
                top.executedQuantity += filledQty;
                top.remainingQuantity -= filledQty;

                if (top.remainingQuantity == 0) {
                    askArr.shift(); 
                }
            }
            return [order,trade];
        } else if (order.side == "SELL") {
            let bidArr = this.bids;
            while (order.remainingQuantity > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                let filledQty = Math.min(order.remainingQuantity, top.remainingQuantity);
                this.currentPrice = top.price;
                trade.push([top.price,filledQty]);
                order.executedQuantity += filledQty;
                order.remainingQuantity -= filledQty;
                top.executedQuantity += filledQty;
                top.remainingQuantity -= filledQty;

                if (top.remainingQuantity == 0) {
                    bidArr.shift(); 
                }
            }
            return [order,trade];
        } else {
            console.log("Invalid market order side");
            return [ order,trade ];
        }
    }

    getPrice() {
        return this.currentPrice;
    }

    getBookSnapShot() {
        return {
            "asks": this.asks.map((a) => [a.price, a.remainingQuantity]),
            "bids": this.bids.map((b) => [b.price, b.remainingQuantity])
        };
    }
    getlatestTrades(){
        return this.trades;
    }
}


// let BTCUSDOrderBook = new OrderBook("BTCUSD");

// BTCUSDOrderBook.placeOrder("100", 5, "LIMIT", "BUY", "Sargun");
// BTCUSDOrderBook.placeOrder("101", 10, "LIMIT", "BUY", "Kavya");
// BTCUSDOrderBook.placeOrder("99", 5, "LIMIT", "BUY", "Sargunnn");
// console.log(BTCUSDOrderBook.getBookSnapShot());
// console.log(BTCUSDOrderBook.getlatestTrades());
// BTCUSDOrderBook.placeOrder("102", 5, "LIMIT", "SELL", "Sargun");
// BTCUSDOrderBook.placeOrder("103", 5, "LIMIT", "SELL", "Kavya");
// BTCUSDOrderBook.placeOrder("104", 5, "LIMIT", "SELL", "Sargunnn");
// console.log(BTCUSDOrderBook.getBookSnapShot());
// console.log(BTCUSDOrderBook.getlatestTrades());
// BTCUSDOrderBook.placeOrder("101", 3, "LIMIT", "SELL", "Sargunnn");
// console.log("Current Price:", BTCUSDOrderBook.getPrice());


// BTCUSDOrderBook.placeOrder(null, 7, "MARKET", "BUY", "Rohan");
// BTCUSDOrderBook.placeOrder(null, 10, "MARKET", "SELL", "Aditi");

// console.log("Snapshot:", BTCUSDOrderBook.getBookSnapShot());
// console.log(BTCUSDOrderBook.getlatestTrades());
module.exports = OrderBook;