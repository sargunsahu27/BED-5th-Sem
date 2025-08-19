const User=require("../model/user");
const Blog=require("../model/blog");
module.exports.postAddBlog=async(req,res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let userId= req.body.userId;
    let blog = {
        title : title,
        body : body,
        date : Date.now(),
        userId:userId
    }
    let newBlog = new Blog(blog) 
    await newBlog.save()
    let user=await User.findById(userId);
    user.blogs.push(newBlog._id);
    await user.save();
    res.json({
        success : true,
        message : "blog added successfully",
        data : newBlog
    })
}
module.exports.deleteOneBlog=async (req, res) => {
    let id = req.params.id;
    let userId = req.body.userId;
    let blogExist = await Blog.findById(id);
    if (!blogExist) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }
    if(blogExist.userId.toString() !== userId) {
        return res.status(403).json({   
            success: false,
            message: "You are not authorized to delete this blog"
        });
    }
    await Blog.findByIdAndDelete(id);
    let user = await User.findById(userId);
}
module.exports.getAllBlogs=async (req,res)=>{
    let allBlogs = await Blog.find();
    res.json({
        success : true,
        message : "all data fetched successfully",
        data : allBlogs
    })
}
module.exports.getOneBlog=async (req,res)=>{
    let id = req.params.id;
    let blog = await Blog.findById(id); 
    res.json({
        success : true,
        message : "blog fetched successfully",
        data : blog
    })
}