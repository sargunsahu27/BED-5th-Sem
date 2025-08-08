const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.post("/user",(req,res)=>{
   try{
  const { email, password } = req.body;
  let newuser={
    email,
    password
  }
  console.log(`Email: ${email}, Password: ${password}`);
  //res.send("User data received successfully!"); // <-- Added response
  res.json({
    success:true,
    data:newuser,
    message:"user added successfully"
  })
}catch(error){
    res.json({
        success:false,
        message:"An error occurred while processing your request"
    })
}
  
});









app.listen(3565, () => {
  console.log('Server is running on port 3565');
});