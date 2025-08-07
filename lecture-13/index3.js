// how to insert a new element in DOM
// 1. create a new element ----> createElement
// 2. add required data to the new element ----> innerHTML, innerText
// 3. add that element in parent container ----> appendChild, append

let todo = {
    id: 7621,
    title: "new todo"
}

let ul = document.querySelector(".todoList");

function addTodo(todo) {
    let li = document.createElement("li"); 
    li.setAttribute("id", `${todo.id}`);
    li.innerHTML = `<div>
                <input type="checkbox" name="" id="checkbox" >
                <h1>${todo.title}</h1>
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, laudantium.</p>
                </div>
            </div>`
    ul.appendChild(li)
}

// addTodo(todo);

let todos = [
    {
        id: 7621,
        title: "new todo"
    },
    {
        id: 7622,
        title: "another todo"
    },
    {   
        id: 7623,
        title: "yet another todo"   
    }
];

function showAllTodos(todos) {
    todos.forEach(todo => addTodo(todo));
}

showAllTodos(todos);