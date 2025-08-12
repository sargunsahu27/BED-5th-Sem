// mongodb -- bson format - binary json, schema less, nosql, data stored in  document stored in collection in mongodb.
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Blog=require("./model/blog");
app.use(express.json);
app.use(express.urlencoded({extended: true}));
//create
app.post('/blogs',async(req,res)=>{
   const {title,body}=req.body;
    let blog={
        title:title,
        body:body,
        date:Date.now
    }
    let newBlog=new Blog(blog);// new modelName(object) 
    await newBlog.save();// -- IO operation
    res.json({
        success:true,
        message:"blog added successfully",
        data:newBlog
    })
})
mongoose.connect('mongodb://127.0.0.1:27017/G27DB')
.then(()=>console.log('Connected to MongoDB'))
app.listen(3333,()=>{
    console.log('Server is running on port 3333');
})