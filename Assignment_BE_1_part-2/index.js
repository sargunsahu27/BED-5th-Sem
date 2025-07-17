const fs=require("fs");
let userData=[
    {id:1,name:"Alice",age:25},
    {id:2,name: "Bob",age:30},
    {id:3,name:"Charlie",age:35}
];

fs.writeFile("usersData.txt", JSON.stringify(userData), (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
});
let productData=[
    {id:1,name:"Laptop",price:1000},
    {id:2,name:"Phone",price:500},
    {id:3,name:"Tablet",price:300},
    {id:4,name:"Monitor",price:200},
    {id:5,name:"Keyboard",price:50},
    {id:6,name:"Mouse",price:25}
];
fs.writeFile("productsData.txt", JSON.stringify(productData), (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
});

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

                // fs.writeFile("orderHistory.txt", JSON.stringify(orderHistory), (err) => {
                //     if (err) {
                //         console.error("Error writing to order history file:", err);
                //     } else {
                //         console.log("Order history updated successfully.");
                //     }
                // });
                fs.appendFile("orderHistory.txt", JSON.stringify(orderHistory), (err) => {
                    if (err) {
                        console.error("Error writing to order history file:", err);
                    } else {
                        console.log("Order history updated successfully.");
                    }
                });
            });
        });
    });
}


const username = process.argv[2]; // Get the username from terminal arguments
const productname = process.argv[3]; // Get the product name from terminal arguments
// Call the buyProduct function with the provided username and product name
buyProduct(username, productname);