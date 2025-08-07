fetch("http://localhost:3232/todos")  // return promise
    .then((response) => response.json()) 
    .then((data) => console.log(data))