const fs=require("fs");
// yaha pe hum buy product wala function banayege arguments index.js se aajayenge
function buyProduct(username, productname) {
    fs.readFile("productsData.txt", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading products file:", err);
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.name === productname);
        
        if (!product) {
            console.log(`Product ${productname} not found.`);
            return;
        }

        fs.readFile("usersData.txt", "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading users file:", err);
                return;
            }
            const users = JSON.parse(data);
            const user = users.find(u => u.name === username);

            if (!user) {
                console.log(`User ${username} not found.`);
                return;
            }

            console.log(`${user.name} bought ${product.name} for $${product.price}.`);
        });
    });
}
// now i also have to mention this in order history file with status showns as purchased 
fs.readFile("orderHistory.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading order history file:", err);
        return;
    }
    let orderHistory = data ? JSON.parse(data) : [];
    
    const order = {
        username: username,
        productname: productname,
        status: "purchased"
    };
    
    orderHistory.push(order);
    
    fs.writeFile("orderHistory.txt", JSON.stringify(orderHistory), (err) => {
        if (err) {
            console.error("Error writing to order history file:", err);
        } else {
            console.log("Order history updated successfully.");
        }
    });
});