const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Blog = require('./model/blog');
const User = require('./model/user');

const app = express();
const port = 1124;
 // keep in .env in production

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Check login
function isLogin(req, res, next) {
    try {
        let token = req.headers['authorization'];
        if (!token) {
            return res.json({ success: false, message: "No token provided" });
        }
        const decoded = jwt.verify(token, "okkkk");
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.json({ success: false, message: "Invalid or expired token" });
    }
}



// Create user (Register)
app.post("/user", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let userexists = await User.findOne({ email });
        if (userexists) {
            return res.json({ success: false, message: "User already exists" });
        }

        let newUser = new User({ name, email, password });
        await newUser.save();

        let token = jwt.sign({ user: newUser }, "okkkk");

        res.json({
            success: true,
            message: "User registered successfully",
            data: newUser,
            token: token
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        if (user.password !== password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        let token = jwt.sign({ user: user },"okkkk", { expiresIn: "1h" });

        res.json({
            success: true,
            message: "Login successful",
            data: user,
            token: token
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Get all users
app.get("/users", async (req, res) => {
    try {
        let allUsers = await User.find();
        res.json({
            success: true,
            message: "All users fetched successfully",
            data: allUsers
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Get single user
app.get("/users/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});



// Create blog
app.post("/blogs", isLogin, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        let newBlog = new Blog({ title, content, userId });
        await newBlog.save();

        let user = await User.findById(userId);
        user.blogs.push(newBlog._id);
        await user.save();

        res.json({
            success: true,
            message: "Blog created successfully",
            data: newBlog
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Get all blogs
app.get("/allblogs", async (req, res) => {
    try {
        const blogs = await Blog.find("userId", "name email");
        res.json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Get single blog
app.get("/blog/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({
            success: true,
            message: "Blog fetched successfully",
            data: blog
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

// Delete blog
app.delete("/blog/:id", isLogin, async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        if (blog.userId.toString() !== req.user._id.toString()) {
            return res.json({ success: false, message: "Permission denied" });
        }

        await Blog.findByIdAndDelete(id);

        let user = await User.findById(req.user._id);
        user.blogs = user.blogs.filter(blogId => blogId.toString() !== id);
        await user.save();

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});


mongoose.connect('mongodb://127.0.0.1:27017/G27DB')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Error:", err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});