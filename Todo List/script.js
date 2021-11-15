const form = document.getElementById("todoForm");
const todoList = document.getElementById("todos");
const input = document.getElementById("input");

const todos = JSON.parse(localStorage.getItem("todos"));

console.log(todos);
if (todos) {
    todos.forEach((todo) => addTodoItem(todo));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodoItem();
});

function addTodoItem(todo) {
    let inputText = input.value;

    if (todo) {
        inputText = todo.text;
    }

    if (inputText) {
        let listItem = document.createElement("li");
        if (todo && todo.completed) {
            listItem.classList.add("completed");
        }
        listItem.innerText = inputText;

        listItem.addEventListener("click", () => {
            listItem.classList.toggle("completed");
            updateLocalStorage();
        });
        listItem.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            listItem.remove();
            updateLocalStorage();
        });
        listItem.classList.add(getColorClass());
        todoList.appendChild(listItem);
        input.value = "";
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const todoElements = document.querySelectorAll("li");

    const todoItems = [];

    todoElements.forEach((element) => {
        todoItems.push({
            text: element.innerText,
            completed: element.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todoItems));
}

function getColorClass() {
    let itemLength = todoList.childNodes.length;
    let remainder = itemLength % 4;
    return remainder == 1
        ? "color1"
        : remainder == 2
        ? "color2"
        : remainder == 3
        ? "color3"
        : "color4";
}
