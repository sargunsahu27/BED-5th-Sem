// in this there is routes for api register and login
const User=require("../model/user");
const jwt=require("jsonwebtoken");
module.exports.postRegisterUser= async (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let userExist = await User.findOne({email:email});
    if(userExist){
       
        return res.json({
            success : false,
            message : "user already exists",
          
        })
    }
    if(!name || !email || !password){
        return res.json({
            success : false,
            message : "name, email and password are required"
        })
    }
    let user = {
        name : name,
        email : email,
        password : password
    }
    let newUser = new User(user)
    await newUser.save()
    res.json({
        success : true,
        message : "user added successfully",
        data : newUser
    })
}
module.exports.getHomePage=async (req,res)=>{
    res.json({
        success : true,
        message : "home page"
    })
}
module.exports.postLoginUser= async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({email:email,password:password});
    if(user){
         let token = jwt.sign({"user":user},"okk")
        res.json({
            success : true,
            message : "user logged in successfully",
            data : user,
              token : token
        })
    }else{
        res.json({
            success : false,
            message : "invalid credentials"
        })
    }
}