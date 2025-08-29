const User = require("../model/user");   // Import User model
const jwt = require("jsonwebtoken");
    // For password hashing

// Register
module.exports.postRegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // create new user with plain text password
        let newUser = new User({ name, email, password }); // store password as is
        await newUser.save();

        // generate token
        let token = jwt.sign({ id: newUser._id }, "okkkk", { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { id: newUser._id, name: newUser.name, email: newUser.email, password: newUser.password },
            token: token
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
// Login


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
