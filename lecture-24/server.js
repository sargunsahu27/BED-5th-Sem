const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express(); // initialize app first

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // fix path

// routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
//
app.use("/api/auth", authRoutes); // Assuming you have authRoutes for login

const port = 1124;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/G27DB')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Error:", err));

// start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
