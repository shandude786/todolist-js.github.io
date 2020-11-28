//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //call getTodos when page loaded
todoButton.addEventListener("click", addTodo); //event when click on input field
todoList.addEventListener("click", deleteCheck); //Event when click on delete button
filterOption.addEventListener("click", filterTodo); // Event when filter data
//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //Todo div
  const todoDiv = document.createElement("div"); // create  Div element
  todoDiv.classList.add("todo"); //add class to div element
  //Create LI
  const newTodo = document.createElement("li"); // create li Element
  newTodo.innerText = todoInput.value; // Li have value of input field
  newTodo.classList.add("todo-item"); // add class=todo-item to li
  todoDiv.appendChild(newTodo); //  add li into Div
  //Add Todo To localStroage
  saveLocalTodos(todoInput.value);
  //Check Mark Button
  const completedButton = document.createElement("button"); //create checked button
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; //add html property to button
  completedButton.classList.add("complete-btn"); //add class=complete-btn to button
  todoDiv.appendChild(completedButton); // add button to Div
  //Check Trash Button
  const trashButton = document.createElement("button"); //create checked button
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //add html property to button
  trashButton.classList.add("trash-btn"); //add class=complete-btn to button
  todoDiv.appendChild(trashButton); // add button to Div
  //Append to List
  todoList.appendChild(todoDiv); // add Div containing li and check,trash button to ul
  //Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  //    console.log(e.target);
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    //   item.remove();
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    // todo.remove();
  }
  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  //console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Chedck ->Hey do I already have thing in there ?
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check we already have todos
    todos = []; // create empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // get todos from localstorage and assign to array
  }
  todos.push(todo); // add new todo into array
  localStorage.setItem("todos", JSON.stringify(todos)); //save array to local storage
}

function getTodos() {
  // console.log("Hello");
  //Chedck ->Hey do I already have thing in there ?
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check we already have todos
    todos = []; // create empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // get todos from localstorage and assign to array
  }
  todos.forEach(function (todo) {
    //Todo div
    const todoDiv = document.createElement("div"); // create  Div element
    todoDiv.classList.add("todo"); //add class to div element
    //Create LI
    const newTodo = document.createElement("li"); // create li Element
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item"); // add class=todo-item to li
    todoDiv.appendChild(newTodo); //  add li into Div

    //Check Mark Button
    const completedButton = document.createElement("button"); //create checked button
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; //add html property to button
    completedButton.classList.add("complete-btn"); //add class=complete-btn to button
    todoDiv.appendChild(completedButton); // add button to Div
    //Check Trash Button
    const trashButton = document.createElement("button"); //create checked button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //add html property to button
    trashButton.classList.add("trash-btn"); //add class=complete-btn to button
    todoDiv.appendChild(trashButton); // add button to Div
    //Append to List
    todoList.appendChild(todoDiv); // add Div containing li and check,trash button to ul
  });
}

function removeLocalTodos(todo) {
  //Chedck ->Hey do I already have thing in there ?
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check we already have todos
    todos = []; // create empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // get todos from localstorage and assign to array
  }
  //   console.log(todo.children[0].innerText);
  //   console.log(todos.indexOf("Aple"));
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
