// let userContrainer= document.querySelector(".user-container")
// function getUsers(URL){
//     //send request to this url to get users data 
//     fetch(URL)
//     .then((res)=>{
//         console.log(res)
//         // let output=
//         return res.json()                             //promise chaning
//     })
//     .then((data)=>{
//         console.log(data)
//         data.forEach((user)=>{
//             showuser(user);
//         })
//     })  
//     .catch((err)=>{
//         console.log(err)
//     })
// }
// function showuser(users){
//     // console.log(data)
//    let li = document.createElement("li")
//    li.innerHTML =`<div class = "user-info">
//                 <h1>${users.name}</h1>
//                 <p>${users.lastName}</p>
//             </div>
//             <div class = "user-btn">
//                 <button id ="delete-user">delete</button>
//                 <button id ="edit-user">edit</button>
//             </div>`    
//     userContrainer.appendChild(li)    
// }
// getUsers("https://jsonplaceholder.typicode.com/users");
let userContainer = document.querySelector(".user-container");

function getUsers(URL) {
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((user) => {
                showUser(user);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

getUsers("https://jsonplaceholder.typicode.com/users");
getUsers("https://localhost:3004/users");

function showUser(user) {
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="user-info">
            <h1 id="name">${user.name}</h1>
            <p id="username">${user.username}</p>
        </div>
        <div class="user-btn">
            <button id="delete-user">delete</button>
            <button id="edit-user">edit</button>
        </div>
    `;
    userContainer.appendChild(li);
}
