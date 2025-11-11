const express=require('express');
const app=express();
const port=1000;
const orderRoute=require('./api/Controller/routes/orderRoute');
app.use(express.json());

app.use('/api/v1/order',orderRoute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});