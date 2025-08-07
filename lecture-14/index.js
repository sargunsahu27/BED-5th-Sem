const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
// express.static(__dirname + "/public");
app.use(express.static(path.join(__dirname, "public")));

app.get("/users", (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) return res.send(err);
        let users = JSON.parse(data);
        res.json(users);
    });
});

app.listen(3004, () => {
    console.log("Server is running on port 3004");
});
