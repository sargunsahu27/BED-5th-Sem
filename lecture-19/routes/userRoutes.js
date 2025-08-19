const express=require("express");
const router=express.Router();
// const User = require('./../model/user');
// const Blog = require('./../model/blog');
let {postAddUser,getAllUsers,getOneUser}=require("../controller/userController");
router.post("/adduser",postAddUser);

// read
// read all users
router.get("/allusers",getAllUsers);
// read single user
router.get("/users/:id",getOneUser);

module.exports=router;