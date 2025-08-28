const User = require("../model/user");   // Import User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");       // For password hashing

// Register
module.exports.postRegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        let newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // generate token
        let token = jwt.sign({ id: newUser._id }, "okkkk", { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { id: newUser._id, name: newUser.name, email: newUser.email },
            token: token
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Login
module.exports.postLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // generate token
        let token = jwt.sign({ id: user._id }, "okkkk", { expiresIn: "1h" });

        res.json({
            success: true,
            message: "Login successful",
            data: { id: user._id, name: user.name, email: user.email },
            token: token
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all users
module.exports.getUsers = async (req, res) => {
    try {
        let allUsers = await User.find().select("-password"); // hide password
        res.json({
            success: true,
            message: "All users fetched successfully",
            data: allUsers
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get single user
module.exports.getOneUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findById(id).select("-password"); // hide password
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
