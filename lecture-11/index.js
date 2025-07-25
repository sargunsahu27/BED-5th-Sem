//accesing dom elements
// using id
const res = document.getElementById("mydiv");
// console.log(res);
console.dir(res);
// using class
const h2 = document.getElementsByClassName("h2");
console.log(h2);
console.log(h2[0]);
// using tag name
const p = document.getElementsByTagName("p");
console.log(p);
// using query selector
const res2 = document.querySelector("p");
document.querySelectorAll("p");
console.log(res2);
//document properties
//1.accessing elment content and change it.
// *innerHTML
console.log(res.innerHTML); //getter
res.innerHTML = "<h1>hello world</h1>"; //setter
// *inner text
console.log(res.innerText); //getter
res.innerText = `hello world`; //setter
// *text content
console.log(res.textContent); //getter
res.textContent = `hello world`; //setter

// accessing element class or id or etc
// 1. getAttribute
console.log(res.getAttribute("id")); //getter
//res.setAttribute("id", "newId"); //setter
//console.log(res.getAttribute("id")); //getter
let btn= document.querySelector(".btn");
btn.addEventListener("click",  ()=> {
   
res.setAttribute("class", "js"); //setter
});
// only for class attribute 
//* classList 
// agr kisi element me class ko add karna ho get krna ho remove krna ho to element ki property use hoti hai
let myH=document.querySelector(".myH");
console.log(myH.classList); //getter
myH.classList.add("JaiHo"); //setter
myH.classList.remove("falana"); //setter
// myH.classList.toggle("newClass"); //toggle class
btn.addEventListener("click",  ()=> {
   
myH.classList.toggle("JaiHo"); //setter
});
// i want to show form when signup and hide when signup is done using button asin my html

let form = document.querySelector(".signUp");
let btnn = document.querySelector(".btnn");
btnn.addEventListener("click", () => {
    form.classList.toggle("hide");
    // hide form when signup done
    //using hide class
});