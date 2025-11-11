const express=require('express');
const app=express();
const port=5001;
const orderRoute=require('./Routes/order');
app.use(express.json());

app.use('/api/v1/order',orderRoute);


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});