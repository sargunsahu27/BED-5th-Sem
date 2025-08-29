const jwt = require("jsonwebtoken");
const User = require("../model/user");

async function isLogin(req, res, next) {
    try {
        // Check for Authorization header
        let token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: "No token provided" });
        }

        // If token has "Bearer " prefix, remove it
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        // Verify token
        const decoded = jwt.verify(token, "okkkk"); // secret should come from process.env
        if (!decoded) {
            return res.json({ success: false, message: "Invalid token" });
        }

        // Fetch fresh user from DB
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        return res.json({ success: false, message: "Invalid or expired token" });
    }
}

module.exports = isLogin;
