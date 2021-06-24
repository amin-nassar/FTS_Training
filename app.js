const addTodoForm = document.querySelector("form");
const todosList = document.querySelector("#todos");
const searchInput = document.querySelector("#search");
const backdrop = document.querySelector("#backdrop");
const modal = document.querySelector("#modal");
const numberOfTodos = document.querySelector("#todo-number");
const numberOfDone = document.querySelector("#done-number");

let todos = [];

function prepareTodoList() {
  const todoElements = todos.map((todo) =>
    createNewTodo(todo.id, todo.task, todo.assignee, todo.isCompleted)
  );
  todoElements.forEach((todo) => todosList.appendChild(todo));
  saveNumbers();
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

function checkForTermExist(todo, term) {
  const taskText = todo.firstElementChild.textContent;
  return taskText.indexOf(term) > -1;
}

function searchForTodo() {
  const term = searchInput.value;
  const todosArray = Array.from(todosList.children);
  todosArray.forEach(
    (todo) =>
      (todo.style.display = checkForTermExist(todo, term) ? "grid" : "none")
  );
}

function toggleTodo(id) {
  todos.forEach((todo) => {
    if (todo.id == id) todo.isCompleted = !todo.isCompleted;
  });
  const checkedTodo = document.getElementById(id);
  checkedTodo.classList.toggle("completed");
  saveTodos();
}

function hideConfirmationModal() {
  backdrop.style.display = "none";
}

function showConfirmationModal() {
  backdrop.style.display = "flex";
  backdrop.addEventListener("click", hideConfirmationModal);
}

function confirmDeletion() {
  showConfirmationModal();
  let promise = new Promise(function (resolve, _) {
    modal.addEventListener("click", (e) => handleModalClick(e, resolve));
  });
  return promise;
}

function handleModalClick(event, resolveFunction) {
  const clickedElement = event.target;
  if (clickedElement.tagName == "BUTTON") {
    resolveFunction(clickedElement.textContent == "Delete");
  } else {
    event.stopPropagation();
  }
}

function deleteById(todosArray, id) {
  const indexOfTodo = todosArray.findIndex((todo) => todo.id == id);
  todosArray.splice(indexOfTodo, 1);
}

async function deleteTodo(id) {
  const isDeletionConfirmed = await confirmDeletion();
  if (isDeletionConfirmed) {
    const deletedTodo = document.getElementById(id);
    todosList.removeChild(deletedTodo);
    deleteById(todos, id);
    saveTodos();
  }
}

function handleCompleteAndDelete(e) {
  const elementClicked = e.target;
  if (elementClicked.tagName != "P") {
    const targetTodo = elementClicked.dataset.target;
    switch (elementClicked.dataset.role) {
      case "complete":
        toggleTodo(targetTodo);
        break;
      case "delete":
        deleteTodo(targetTodo);
        break;
    }
  }
}

function updateById(todosArray, id, newTask) {
  const wantedTodo = todosArray.find((todo) => todo.id == id);
  wantedTodo.task = newTask;
}

function inlineEdit(event) {
  const todoElement = event.target.parentElement;
  const todoId = todoElement.getAttribute("id");
  const newTodoTaskName = event.target.textContent;
  updateById(todos, todoId, newTodoTaskName);
}

function calcDone() {
  return todos.reduce(
    (number, todo) => (todo.isCompleted ? number + 1 : number),
    0
  );
}

function saveNumbers() {
  const numberOfDoneItems = calcDone();
  numberOfDone.textContent = numberOfDoneItems;
  numberOfTodos.textContent = todos.length - numberOfDoneItems;
}

function saveTodos() {
  const todosInJSON = JSON.stringify(todos);
  localStorage.setItem("todos", todosInJSON);
  saveNumbers();
}

function loadTodos() {
  const jsonString = localStorage.getItem("todos");
  todos = JSON.parse(jsonString);
}

function setUp() {
  loadTodos();
  prepareTodoList();
  // Add Event Listeners
  addTodoForm.addEventListener("submit", addTodo);
  searchInput.addEventListener("keyup", searchForTodo);
  todosList.addEventListener("click", handleCompleteAndDelete);
  todosList.addEventListener("focusout", inlineEdit);
}

window.addEventListener("DOMContentLoaded", setUp);
