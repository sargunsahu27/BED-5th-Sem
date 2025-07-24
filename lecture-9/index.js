const express = require('express');
const app = express();
const fs = require('fs');
// i want userRegistration data inout from html file so i have to make a static folder in which i will keep my html file and css file
app.use(express.static(__dirname + '/public'));
// i want data through html file not through poastman 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/submitRegistration', (req, res) => {
    console.log(req.body);
    const userData = req.body;
    fs.readFile('/Users/sargunsahu/Documents/BED 5th Sem/lecture-9/userRegistrationData.json', 'utf8', (err, data) => {
        let existingData = [];
        if (err) {
            console.error('Error reading file:', err);
            res.send('Server Error');
            return;
        }
        
           if(!err&&data){
            existingData = JSON.parse(data);
           }
    
        existingData.push(userData);

    fs.writeFile('/Users/sargunsahu/Documents/BED 5th Sem/lecture-9/userRegistrationData.json', JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.send('Server Error!');
        } else {
            console.log('File written successfully');
            res.send('User registration data saved successfully!');
        }
    });
}); 
});
// app.post('/submitRegistration', (req, res) => {
//     console.log(req.body);
//     let username=req.body.username;
//     let email=req.body.email;
//     let password=req.body.password;
//     res.json({
//         message: "User registration data received successfully!",
//         user: {
//             username: username,
//             email: email,
//             password: password
//         }
//     })
// });
app.listen(7094, () => {
    console.log("Server is running on port 7094");
});
// post data from html file to server using html file

