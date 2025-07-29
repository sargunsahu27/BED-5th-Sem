// how to insert new element in dom
// add 1 more li in html (dom)
// 1. create a new element ---> createElement
// 2. add required data in that element using innerText or innerHtml
// 3. add that element in parent container using appendChild or append
// what is container --> like parent of li's is ul so that is container and body is container of all these
let todo={
    id:12455,
    title:"Title 4"
}
let ul=document.querySelector(".ToDoList");
function addTodo(todo){
    // create a new element 
    let li=document.createElement("li");
    li.setAttribute("id",String(`${todo.id}`))
    // add content to the element
    li.innerHTML=` <div>
                   <input type="checkbox" name="" id="checkbox">
                        <h1>${todo.title}</h1>
                        <div>
                            <button class="edit">✍️Edit</button>
                            <button class="delete">❌Delete</button>
                            <p>Hii This is task 1 of to do list 4</p>
                        </div>
                </div>`;
                //add the element in parent container
    ul.appendChild(li);
}
addTodo(todo)