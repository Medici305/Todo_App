// Selectors
const todoInput = document.querySelector(".todoInput");
const todoSubmit = document.querySelector(".todoSubmit");
const todoList = document.querySelector(".todoList");
const todoFilter = document.querySelector(".footer");
const todoNumber = document.querySelector(".todoNumber");
const clearBtn = document.querySelector(".clear-completed");
const nightModeBtn = document.querySelector(".night-mode");
const topSection = document.querySelector(".top");
let currentIndex = 0;

// Functions

// 1. Add todo
const addToDo = (e) => {
  e.preventDefault();
  // Create todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList = "todo-div";
  // Create check icon
  const completeBtn = document.createElement("button");
  completeBtn.classList = "complete-btn";
  completeBtn.innerHTML = '<i class="far fa-circle"></i>';
  todoDiv.appendChild(completeBtn);
  // Create li
  const todoLi = document.createElement("li");
  todoLi.classList = "todo-item";
  todoLi.innerText = todoInput.value;
  todoDiv.appendChild(todoLi);
  // SavetolocalStorage
  saveToLocalStorage(todoInput.value);
  // Create trash icon
  const trashBtn = document.createElement("button");
  trashBtn.classList = "trash-btn";
  trashBtn.innerHTML = '<i class="fa fa-times"></i>';
  todoDiv.appendChild(trashBtn);
  // Append div to ul
  //todoList.appendChild(todoDiv);
  todoList.insertBefore(todoDiv, todoList.childNodes[currentIndex]);
  // increment index
  currentIndex++;
  todoNumber.innerText = todoList.children.length - 1;
  todoInput.value = "";
};

// 2. Remove todo
const removeTodo = (e) => {
  e.preventDefault();
  const item = e.target;

  // When item clicked is times button
  if (item.classList[0] === "trash-btn") {
    item.parentElement.classList.add("fall");
    removeFromLocalStorage(item.parentElement);
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }

  // When you click on click
  if (item.classList[0] === "complete-btn") {
    item.nextSibling.classList.toggle("line");
    return item.children[0].classList.contains("far")
      ? item.children[0].setAttribute("class", "fa fa-circle")
      : item.children[0].setAttribute("class", "far fa-circle");
  }
};

// 3. Filter todo list depending whats clicked on.
const filterTodo = (e) => {
  const list = todoList.childNodes;
  list.forEach((item) => {
    if (item.classList.contains("todo-div")) {
      const lineClass = item.childNodes[1].classList.contains("line");
      switch (e.target.getAttribute("value")) {
        case "all":
          item.style.display = "flex";
          break;
        case "completed":
          if (lineClass) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!lineClass) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
          break;
      }
    }
  });
};

const findItemsLocalStorage = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

// 4. Clear all those completed from list.
const clearCompleted = () => {
  const list = todoList.childNodes;
  for (let item of list) {
    if (item.childNodes[1].classList.contains("line")) {
      item.remove();
    }
  }
  //   list.forEach((todo) => {
  //     if (item.children[1].classList.contains("line")) {
  //       item.remove();
  //     }
  //   });
};

// 5. Save to the local storage
const saveToLocalStorage = (todo) => {
  let todos = findItemsLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// 6. Get item from local storage display in UI
const getFromLocalStorage = () => {
  let todos = findItemsLocalStorage();
  todos.forEach((todo) => {
    // Create todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList = "todo-div";
    // Create check icon
    const completeBtn = document.createElement("button");
    completeBtn.classList = "complete-btn";
    completeBtn.innerHTML = '<i class="far fa-circle"></i>';
    todoDiv.appendChild(completeBtn);
    // Create li
    const todoLi = document.createElement("li");
    todoLi.classList = "todo-item";
    todoLi.innerText = todo;
    todoDiv.appendChild(todoLi);
    // Create trash icon
    const trashBtn = document.createElement("button");
    trashBtn.classList = "trash-btn";
    trashBtn.innerHTML = '<i class="fa fa-times"></i>';
    todoDiv.appendChild(trashBtn);
    // Append div to ul
    todoList.insertBefore(todoDiv, todoList.childNodes[currentIndex]);
    // increment index
    currentIndex++;
    todoNumber.innerText = todoList.children.length - 1;
    todoInput.value = "";
  });
};

// 7. Remove item in local storage when removed from UI
const removeFromLocalStorage = (todo) => {
  let todos = findItemsLocalStorage();
  const itemIndex = todos.indexOf(todo.children[1].innerText);
  todos.splice(itemIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoNumber.innerText = todos.length;
};

// 8. Change background to night mode
const changeBackgroundMode = (e) => {
  // Top section bg
  topSection.classList.toggle("lightBg");
  // Change input and submit button color
  todoInput.classList.toggle("lightMode");
  todoSubmit.classList.toggle("lightMode");
  // change background of body
  document.body.classList.toggle("lightMode");
  if (e.target.classList.contains("night-mode")) {
    // Go to Day mode
    e.target.setAttribute("class", "day");
    // Change the logo
    nightModeBtn.src = "./images/icon-moon.svg";
    // Change ul bg to light mode
    todoList.classList.toggle("lightModeUl");
    todoList.childNodes.forEach((todo) => {
      todo.classList.add("lightMode");
    });
  } else {
    // Switch back to dark-mode
    e.target.setAttribute("class", "night-mode");
    // Change the logo
    nightModeBtn.src = "./images/icon-sun.svg";
    // Change ul bg to light mode
    todoList.classList.toggle("lightModeUl");
    todoList.childNodes.forEach((todo) => {
      todo.classList.remove("lightMode");
    });
  }
};

// Event Listeners
todoSubmit.addEventListener("click", addToDo);
todoList.addEventListener("click", removeTodo);
todoFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getFromLocalStorage);
clearBtn.addEventListener("click", clearCompleted);
nightModeBtn.addEventListener("click", changeBackgroundMode);
