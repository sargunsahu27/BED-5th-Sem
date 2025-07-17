const fs=require("fs");



fs.writeFile("lecture-6/demo.txt","hello g27",function(err,data){
    if(err) return console.log(err);
    console.log("File written successfully");
    
})
fs.writeFile("lecture-6/write.txt","Hello, Sargun😄",function(err,data){
    if(err) return console.log(err);
    console.log("File written successfully");
    
})
// writing both file data into new file in utf8 format
fs.readFile("lecture-6/demo.txt", "utf-8", (err, data) => {
    if (err) return console.log(err);
    let data1=data;
    
    fs.readFile("lecture-6/write.txt", "utf-8", (err, data) => {
        if (err) return console.log(err);
        let data2=data;
        // Combine the content of both files
        const combinedData = data1 + "\n" + data2;

        // Write the combined content to a new file
        fs.writeFile("lecture-6/Demo+Write.txt", combinedData, (err) => {
            if (err) return console.log(err);
            console.log("Files written successfully");
        });
    });
});
// To run asynchronous code in sequence or synchronously, you can use Promises or async/await.
// This example uses callbacks, but you can also use Promises for better readability and error handling
// or even use async/await for a more synchronous style of coding.





// backend homework Assignment part 1
// write data in a file like demo.txt , data will be passed using terminal like argument from terminal should be written in file (inout from user)
// process.argv is used to get the input from terminal
// Assignment naam ka folder banega