const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'))
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");// absolute path of the file ke through we send file on server and the content of file shown on browser.
// })
// app.get("/about.html", (req, res) => {
//     res.sendFile(__dirname + "/about.html");
// })




app.listen(1043,()=>{
    console.log("Server is running on port 1043");
})