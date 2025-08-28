const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const isLogin = require("../middleware/isLogin");

// Auth routes
router.post("/register", userController.postRegisterUser);
router.post("/login", userController.postLoginUser);

// User routes
router.get("/users", isLogin, userController.getUsers);        // only logged-in users can see all users
router.get("/users/:id", isLogin, userController.getOneUser);  // only logged-in users can see one user

module.exports = router;
