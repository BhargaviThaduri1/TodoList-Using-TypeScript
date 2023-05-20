// Creating an interface Todo which describes todolist
interface Todo {
    text: string;
    completed: boolean;
  }

// DOM Manipulation using not null assertions
const btn = document.getElementById("btn")! as HTMLButtonElement; //Type assertion
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;
    
// Fetching/Returning Todos from our localStorage
function fetchTodos(): Todo[] {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null) return [];
    return JSON.parse(todosJSON);
}

const todos: Todo[] = fetchTodos();

// For each todo creating the li element
todos.forEach(createTodo);
  

// Saving todos to LOCAL STORAGE
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event occur when form is submitted
form.addEventListener("submit", handleSubmit);

// Specifying the type of the event i.e submitEvent
function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const newTodo: Todo = {
      text: input.value,
      completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
  }
  
// Creating todo
function createTodo(todo: Todo) {
    const newLI = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
      todo.completed = checkbox.checked;
      saveTodos();
    });
    newLI.append(todo.text);
    newLI.append(checkbox);
    list.append(newLI);
  }
  
  