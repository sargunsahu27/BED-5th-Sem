const express=require("express");
const app=express();
const fs=require("fs");
// want to read data from client side 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.post("/home",(req,res)=>{ 
//     // req.body contains the data sent from the client
//     const {name ,message} = req.body;
//     console.log({name , message});
//     // res.json data send karta hai as a  response back to the client  

//     res.send(`Hello ${name}, your message is: ${message}`);

// })
// post server pe nhi chalega directly jaise get request hoti hai
// task- we have to make a user registration api ( in which we have to take user and store user data in a separate folder)
app.post("/register",(req,res)=>{
    const users = req.body;
    const userData=[];
    for(const i in users){
        userData.push({
            username: users[i].username,
            email: users[i].email,
            password: users[i].password
        })
    }
   

    
    fs.writeFile("/Users/sargunsahu/Documents/BED 5th Sem/lecture-9/UserData/userdata.txt", JSON.stringify(userData), (err) => {
        if(err){
            console.error("Error writing data to file:", err);

        }
        else{
            console.log("User data saved successfully!");
        }
    });
    res.send(`User registered successfully!`);
})
app.get('/getUsers',(req,res)=>{
    // i have to take user data from file which i write earlier 
    fs.readFile("/Users/sargunsahu/Documents/BED 5th Sem/lecture-9/UserData/userdata.txt", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        const users = JSON.parse(data);

        res.send(users);
    });
})
// now we have to make an api for login user as i get username and password from client side and check if it is present in the file or not
app.post("/login",(req,res)=>{
    const {username, password} = req.body;
    fs.readFile("/Users/sargunsahu/Documents/BED 5th Sem/lecture-9/UserData/userdata.txt", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.send("Server Error");
        }
        const users = JSON.parse(data);
        const found = users.find(u=> u.username === username && u.password === password);
        
        if (found) {
            res.send("Login successful!");
        } else {
            res.send("Invalid username or password , Pls enter valid credentials");
        }
    });
})
app.listen(3090,()=>{
    console.log("Server is running on port 3090");
});