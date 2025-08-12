const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 1122;
const Blog = require('./model/blog');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create
app.post('/blogs', async (req, res) => {
const{title,body}= req.body;
let blog={
    title: title,
    body: body,
    date: Date.now()
}
let newblog=new Blog(blog);
await newblog.save()
res.json({
    success: true,
    message: "Blog created successfully",
    data: newblog
});

});
app.get('/allblogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs
    });
});
// fetch all blogs
app.get('/blogs/:id',async (req,res)=>{
  const id = req.params.id;
  let blog=await Blog.findById(id)
res.json({
    success: true,
    message: "Blog fetched successfully",
    data: blog
  });
});

mongoose.connect('mongodb://127.0.0.1:27017/G27DB')
  .then(() => console.log('Connected!'));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});