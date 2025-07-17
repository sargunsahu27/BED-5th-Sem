const fs=require("fs");
// combine data of users.txt and users2.txt into a new file
fs.readFile("lecture-7/users.txt", "utf-8", (err, data) => {
    if (err) return console.log(err);
    let users = JSON.parse(data); // Convert JSON string to object      
    fs.readFile("lecture-7/users2.txt", "utf-8", (err, data) => {
        if (err) return console.log(err);
        let users2 = JSON.parse(data); // Convert JSON string to object
        // Combine the content of both files
        const combinedData = users.concat(users2);

        // Write the combined content to a new file
        fs.writeFile("lecture-7/allUsers.txt", JSON.stringify(combinedData), (err) => {
            if (err) return console.log(err);
            console.log("Combined users written successfully");
        });
    });
});
// This code reads two JSON files, combines their data, and writes the combined data to a new file.
// It uses the fs module to handle file operations and JSON methods to parse and stringify data
// The combined data is written in JSON format to the new file "CombinedUsers.txt".
// This is useful for merging user data from different sources into a single file for further processing or


