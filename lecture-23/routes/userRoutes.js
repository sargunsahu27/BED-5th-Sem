const express = require("express");
const router = express.Router();
exports.router = router;
const userController = require("../controller/userController");
const isLogin = require("../middleware/isLogin");

// Auth routes
router.post("/register", userController.postRegisterUser);


// User routes
router.get("/users",userController.getUsers);        // only logged-in users can see all users
router.get("/users/:id",userController.getOneUser);  // only logged-in users can see one user

module.exports = router;
