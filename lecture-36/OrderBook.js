class OrderBook{
    constructor(symbol){
        this.symbol = symbol;
        this.bids = [];
        this.asks=[];
        this.currentPrice=null;
        this.trades=[];
    }
    _sort(side){
        if(side=="BUY"){
            this.bids.sort((a,b)=>{
                if(a.price!=b.price){
                   return  b.price-a.price;
                }
                a.timestamp - b.timestamp;
        });// sort in lexographically (sort by alphabetical order)
            
        }
        else if(side=="SELL"){
            this.asks.sort((a,b)=>{
                if(a.price!=b.price){
                  return   a.price - b.price;
                }
                a.timestamp - b.timestamp;
        });

    }
}
    placeOrder(price,quantity,type,side,username){
        let newOrder={
            symbol:this.symbol,
            orderId:Math.floor(Math.random()*1000000),
            side:side,
            type:type,
            price:price || null,
            Originalquantity:quantity,
            executedQuantity:0,
            remainingQuantity:quantity,
            user:username,
            timestamp:Date.now()
        }
        if(newOrder.type=="LIMIT"){
            let result=this._LimitMatch(newOrder);
            if(result.remainingQuantity>0){

                if(result.side=="BUY"){
                this.bids.push(result);
                }
                else{
                    this.asks.push(result);
                }
                this._sort(newOrder.side);
            }
        }
        else{
            let result=this._MarketMatch(newOrder);
        }
    }
    
    _LimitMatch(order){
       if(order.side=="BUY"){
        // match with asks
        let askArr=this.asks;
        while(order.remainingQuantity>=0 && askArr.length>0){
            let top=askArr[0];
            if(order.price>=top.price){
               let buyQuantity=Math.min(top.quantity,order.quantity);
               // update ----> order
               order.executedQuantity+=buyQuantity;
               order.remainingQuantity-=buyQuantity;

               top.executedQuantity+=buyQuantity;
               top.remainingQuantity-=buyQuantity;
               if(top.remainingQuantity==0){
                askArr.shift();
               }
               
            }
            else{
                break;
            }
              
        }
        return order;
       }
       else if(order.side=="SELL"){

        // match with bids
         let bidArr = this.bids;
    while (order.remainingQuantity > 0 && bidArr.length > 0) {
        let top = bidArr[0]; // highest bid
        
        // For a SELL order, match if the bid price >= sell price
        if (order.price <= top.price) {
            let sellQuantity = Math.min(top.remainingQuantity, order.remainingQuantity);
            
            // update order quantities
            order.executedQuantity += sellQuantity;
            order.remainingQuantity -= sellQuantity;

            // update bid quantities
            top.executedQuantity += sellQuantity;
            top.remainingQuantity -= sellQuantity;

            // remove fully filled bid from book
            if (top.remainingQuantity == 0) {
                bidArr.shift();
            }
        } else {
            // can't match further (no higher bids)
            break;
        }
    }
    return order;
       }
       else{
        return "Invalid order side";
       }
    }
    _MarketMatch(){}

     
}

let BTCUSDOrderBook=new OrderBook("BTCUSD");
// BTCUSDOrderBook.bids.push({price:100,quantity:10,type:"LIMIT",user:"Sargun"});
// BTCUSDOrderBook.bids.push({price:105,quantity:5,type:"LIMIT",user:"Kavya"});
// BTCUSDOrderBook.bids.push({price:102,quantity:20,type:"LIMIT",user:"Muskan"});

// BTCUSDOrderBook._sort("BUY");
// console.log("Bids:",BTCUSDOrderBook.bids);
// BTCUSDOrderBook.asks.push({price:110,quantity:8,type:"LIMIT",user:"Manik"});
// BTCUSDOrderBook.asks.push({price:108,quantity:15,type:"LIMIT",user:"Kamaal"});
// BTCUSDOrderBook.asks.push({price:112,quantity:12,type:"LIMIT",user:"Simmi"});
// BTCUSDOrderBook._sort("SELL");
// console.log("Asks:",BTCUSDOrderBook.asks);

BTCUSDOrderBook.placeOrder("100",5,"LIMIT","BUY","Sargun");
BTCUSDOrderBook.placeOrder("101",10,"LIMIT","BUY","Kavya");
BTCUSDOrderBook.placeOrder("99",6,"LIMIT","BUY","Sargunnn");
console.log(BTCUSDOrderBook);
BTCUSDOrderBook.placeOrder("100",5,"LIMIT","SELL","Sargun");
BTCUSDOrderBook.placeOrder("101",3,"LIMIT","SELL","Kavya");
BTCUSDOrderBook.placeOrder("99",4,"LIMIT","SELL","Sargunnn");
console.log(BTCUSDOrderBook);




// Homework -- market match ka function complete krna hai 