const fs = require("fs");
const fileData = process.argv[2]; // Get the input from terminal arguments
const filePath = "content/assignment.txt"; // Path to the file

// Read the file to check if it exists or not
fs.readFile(filePath, "utf-8", (err, data) => {
    let content = "";

    if (err) {
        // If file does not exist
        console.log("File not found, creating a new file.");
    } else {
       
        content = data;
    }

    
    content += fileData + "\n";

    
    fs.writeFile(filePath, content, (err) => {
        if (err) return console.log("Error writing to file:", err);
        console.log("Data written to file successfully");
    });
});

 // Read the file to check if it exists or not
// This code reads a file named "assignment.txt" in the "content" folder.
// If the file does not exist, it creates a new file and writes the input data from the terminal into it.
// If the file exists, it appends the new data to the file.
// The input data is taken from the terminal arguments using
    
