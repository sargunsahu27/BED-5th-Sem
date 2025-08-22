const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// user register and login api

const user = require('./model/user');

function isLogin(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, 'okk', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();     
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

let userRoutes=require("./routes/userRoutes");
app.use("/api/users",userRoutes);



mongoose.connect("mongodb://127.0.0.1:27017/g27sdb")
.then(()=>{
    console.log("DB connected");
})
app.listen(3005,()=>{
    console.log("Server started at 3005");
});
