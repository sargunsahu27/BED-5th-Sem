const fs = require("fs");
function read(filePath){
    return new Promise((resolve, reject) => { 
    fs.readFile(filePath, "utf-8", (err, data) => {
          
            if (err) {
                // console.log("Error reading file:", err);
                return reject(err); // Reject the promise if file read fails
            }

                let users = JSON.parse(data); // Convert JSON string to object
               
                resolve(users); // Resolve the promise with file content
            
        });
    });
}
function write(filePath, data) {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        return new Promise((resolve, reject) => {
            if (err) {
                // console.log("Error writing to file:", err);
                return reject(err); // Reject the promise if file write fails
            }
            resolve("Data written successfully"); // Resolve the promise on successful write
        });
    });
}
module.exports = {
    read,
    write
};
// This module provides functions to read and write files using promises.
// The `read` function reads a file and returns its content as a promise.
// The `write` function writes data to a file and returns a success message as a promise.