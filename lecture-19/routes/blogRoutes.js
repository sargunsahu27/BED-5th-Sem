const express=require("express")
const router=express.Router();// small --> app
// const Blog = require('./../model/blog');
// const Blog = require('./../model/user');
let {postAddBlog,getAllBlogs,getOneBlog,deleteOneBlog}=require("../controller/blogController")
router.post("/add",postAddBlog);

// read
// read all data
router.get("/allblogs",getAllBlogs);
// read single data
router.get("/oneblog/:id",getOneBlog);
router.delete("/delete/:id",deleteOneBlog);




module.exports=router;