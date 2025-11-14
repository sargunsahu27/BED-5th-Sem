const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req,res)=>{
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User created" });
};

module.exports.login = async (req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ error: "Invalid credentials" });
    if (user.password !== password) return res.json({ error: "Invalid credentials" });

    const token = jwt.sign({ username: user.username, id: user._id }, "secretkey");

    res.json({ token });
};
