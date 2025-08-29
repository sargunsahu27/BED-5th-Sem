const User = require("../model/user");

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