const fs=require("fs");


fs.readFile("lecture-6/demo.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    console.log("File content:", data);
});
fs.readFile("lecture-6/write.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    console.log("File content:", data);
});
//" utf8 is used to read the file as a string, not a buffer(binary data)"
fs.readFile("lecture-6/Demo+Write.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    console.log("Combined file content:", data);
});