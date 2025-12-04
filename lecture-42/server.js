const express = require('express');
const app = express();
const port = 3210;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User=require("./model/user.model");


app.post("/api/users/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const existingUser= await User.findOne({email:email});//User is model here // representing database collection 
    if(existingUser){
        return res.send({message:"User already exists"});
    }
    else{
  const newuser=User.create({
        name:name,
        email:email,
        password:password
    })  
     return res.json({
        sucess:true,
        message:"User registered successfully"
    });
    }
         
})
module.exports=app;


// Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });