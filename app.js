const addTodoForm = document.querySelector("form");
const todosList = document.querySelector("#todos");
const searchInput = document.querySelector("#search");
const backdrop = document.querySelector("#backdrop");
const modal = document.querySelector("#modal");

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
  }
}

todosList.addEventListener("click", function (e) {
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
});

// Add Event Listeners
window.addEventListener("DOMContentLoaded", prepareTodoList);
addTodoForm.addEventListener("submit", addTodo);
searchInput.addEventListener("keyup", searchForTodo);
