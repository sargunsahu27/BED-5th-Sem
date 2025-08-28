const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const isLogin = require("../middleware/isLogin"); // JWT middleware

// Routes
router.post("/blogs", isLogin, blogController.postCreateBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getOneBlog);
router.delete("/blogs/:id", isLogin, blogController.deleteBlog);

module.exports = router;
