const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api", userRoutes);
app.use("/api", blogRoutes);

const port = 1124;







mongoose.connect('mongodb://127.0.0.1:27017/G27DB')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Error:", err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});