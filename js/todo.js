const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function toggleTodo(event) {
    const content = event.target;
    const li = event.target.parentElement;
    const toDo = toDos.find((toDo) => toDo.id === parseInt(li.id));

    if (toDo.isComplete) {
        content.style.textDecoration = "none";
        toDo.isComplete = false;
    } else {
        content.style.textDecoration = "line-through";
        toDo.isComplete = true;
    }

    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const div = document.createElement("div");
    const button = document.createElement("button");
    div.innerText = newTodo.text;
    div.addEventListener("click", toggleTodo);
    if (newTodo.isComplete) {
        div.style.textDecoration = "line-through";
    }
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo);
    li.appendChild(div);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        isComplete: false,
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

// const toDoContents = document.querySelectorAll("#todo-list div");
// [].forEach.call(toDoContents, function (toDoContent) {
//     toDoContent.addEventListener("click", toggleTodo);
// });
