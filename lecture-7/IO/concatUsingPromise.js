async function concatUsingPromise(file1, file2, allusers2) {
    let user1=await read(file1);
    console.log(user1);
    let user2=await read(file2);
    let allusers=user1.concat(user2);
    let message=await write(allusers2,JSON.stringify(allusers) );
    console.log(message);
}
concatUsingPromise("lecture-7/users.txt", "lecture-7/users2.txt", "lecture-7/task/allUsers.txt");

