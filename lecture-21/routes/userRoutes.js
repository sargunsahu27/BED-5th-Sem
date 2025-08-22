const express=require("express");
const router=express.Router();
let {postRegisterUser,postLoginUser}=require("../controller/userController");
router.post("/register",postRegisterUser);
router.post("/login",postLoginUser);
router.get("/home",require("../controller/userController").getHomePage);
module.exports=router;