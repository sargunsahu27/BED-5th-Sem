let ed=document.querySelector(".edit");
let del=document.querySelector(".delete");
/*
parent
child siblings
*/
/*
1.nextElementSibling
2.previousElementSibling
*/
//console.dir(ed);// console in object format
console.log(ed.nextElementSibling);
// console.log(ed.previousElementSibling)
console.log(ed.nextElementSibling.nextElementSibling.innerText)
// h1
console.log(ed.parentElement.previousElementSibling)
console.log(del.parentElement.parentElement.parentElement)
let id=del.parentElement.parentElement.parentElement.getAttribute("id");
console.log(id);
