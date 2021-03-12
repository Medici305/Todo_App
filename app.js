// Selectors
const todoInput = document.querySelector('.todoInput');
const todoSubmit = document.querySelector('.todoSubmit');
const todoList = document.querySelector('.todoList');
const todoFilter = document.querySelector('.footer');
let currentIndex = 0;

// Functions

// 1. Add todo
const addToDo = (e) => {
    e.preventDefault();
    // Create todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList = 'todo-div';
    // Create check icon
    const completeBtn = document.createElement('button');
    completeBtn.classList = 'complete-btn';
    completeBtn.innerHTML = '<i class="far fa-circle"></i>';
    todoDiv.appendChild(completeBtn);
    // Create li
    const todoLi = document.createElement('li');
    todoLi.classList = 'todo-item';
    todoLi.innerText = todoInput.value;
    todoDiv.appendChild(todoLi);
    // Create trash icon
    const trashBtn = document.createElement('button');
    trashBtn.classList = 'trash-btn';
    trashBtn.innerHTML = '<i class="fa fa-times"></i>';
    todoDiv.appendChild(trashBtn);
    // Append div to ul
    //todoList.appendChild(todoDiv);
    todoList.insertBefore(todoDiv, todoList.childNodes[currentIndex]);
    // increment index 
    currentIndex++;
    todoInput.value = '';
}

// 2. Remove todo
const removeTodo = e => {
    e.preventDefault();
    const item = e.target;

    // When item clicked is times button
    if (item.classList[0] === 'trash-btn') {
        item.parentElement.classList.add('fall');
        item.parentElement.addEventListener('transitionend', () => {
            item.parentElement.remove();
        })
    }

    // When you click on click
    if (item.classList[0] === 'complete-btn') {
        item.nextSibling.classList.toggle('line');
        return item.children[0].classList.contains('far') ? item.children[0].setAttribute('class', 'fa fa-circle') : item.children[0].setAttribute('class', 'far fa-circle')
    }
}

// 3. Filter todo list depending whats clicked on.
const filterTodo = e => {
    const list = todoList.childNodes;
    list.forEach(item => {
        if (item.classList.contains('todo-div')) {
            const lineClass = item.childNodes[1].classList.contains('line');
            switch(e.target.getAttribute('value')) {
                case 'all':
                    item.style.display = 'flex';
                    break;
                case 'completed':
                    if(lineClass) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                    break;
                case 'uncompleted':
                    if(!lineClass) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                    break;
            }
        }
    })
}

// Event Listeners
todoSubmit.addEventListener('click', addToDo);
todoList.addEventListener('click', removeTodo);
todoFilter.addEventListener('click', filterTodo)