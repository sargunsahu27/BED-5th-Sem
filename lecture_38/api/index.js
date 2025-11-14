const express = require('express');
const app = express();
const port = 5003;
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/orderbook")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const orderRoute = require('./Routes/order');
const authRoute = require('./Routes/authroutes.js');

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/order', orderRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
