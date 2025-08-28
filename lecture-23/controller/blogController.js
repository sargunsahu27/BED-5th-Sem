const Blog = require("../model/blog");
const User = require("../model/user");

// Create Blog (Login required)
module.exports.postCreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id; // comes from isLogin middleware

        let newBlog = new Blog({ title, content, userId });
        await newBlog.save();

        // push blog id into user
        let user = await User.findById(userId);
        user.blogs.push(newBlog._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all blogs
module.exports.getAllBlogs = async (req, res) => {
    try {
        // populate userId with name & email from User model
        const blogs = await Blog.find().populate("userId", "name email");
        res.json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get single blog by ID
module.exports.getOneBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id).populate("userId", "name email");
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json({
            success: true,
            message: "Blog fetched successfully",
            data: blog
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete blog (Login required)
module.exports.deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // check ownership
        if (blog.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Permission denied" });
        }

        await Blog.findByIdAndDelete(id);

        // remove blog reference from user
        let user = await User.findById(req.user._id);
        user.blogs = user.blogs.filter(blogId => blogId.toString() !== id);
        await user.save();

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
