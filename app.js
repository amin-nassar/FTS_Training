const addTodoForm = document.querySelector("form");
const todosList = document.querySelector("#todos");

let todos = [
  {
    id: 1,
    task: "Go To The Market",
    assignee: "Sameer Nassar",
    isCompleted: true
  },
  {
    id: 2,
    task: "Go For A Walk",
    assignee: "Amin Nassar",
    isCompleted: false
  },
  {
    id: 3,
    task: "Clean The House",
    assignee: "Ali Nassar",
    isCompleted: true
  },
  {
    id: 4,
    task: "Study For 4 Hours",
    assignee: "Waleed Nassar",
    isCompleted: false
  }
];

function prepareTodoList() {
  const todoElements = todos.map((todo) =>
    createNewTodo(todo.id, todo.task, todo.assignee, todo.isCompleted)
  );
  todoElements.forEach((todo) => todosList.appendChild(todo));
}

function createNewTodo(id, task, assignee, isCompleted) {
  // Create Todo
  const todo = document.createElement("li");

  // Create Task Text
  const taskPTag = document.createElement("p");
  taskPTag.textContent = task;
  taskPTag.setAttribute("contenteditable", "true");

  // Create Assignee Text
  const assigneePTag = document.createElement("p");
  assigneePTag.textContent = assignee;

  // Trash Icon
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fas", "fa-trash");
  trashIcon.dataset.role = "delete";
  trashIcon.dataset.target = id;

  // Complete Icon
  const completeIcon = document.createElement("i");
  completeIcon.classList.add("fas", "fa-check-circle");
  completeIcon.dataset.role = "complete";
  completeIcon.dataset.target = id;

  // Append Elements To The Todo Item
  todo.appendChild(taskPTag);
  todo.appendChild(trashIcon);
  todo.appendChild(assigneePTag);
  todo.appendChild(completeIcon);

  // Set Todo Id
  todo.setAttribute("id", id);

  // Make Item Complted If Needed
  if (isCompleted) todo.className = "completed";
  return todo;
}

function addTodo(e) {
  e.preventDefault();
  const taskInput = document.querySelector("#task");
  const assigneeInput = document.querySelector("#assignee");
  const task = taskInput.value;
  const assignee = assigneeInput.value;
  const id = Date.now();
  const todo = createNewTodo(id, task, assignee, false);

  todos.push({ id, task, assignee, isCompleted: false });
  todosList.appendChild(todo);
  saveTodos();
}

// Add Event Listeners
addTodoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", prepareTodoList);
