import dateFormat, { masks } from "dateformat";
const now = new Date();
const today = dateFormat(now, 'yyyy-mm-dd');
const nextDay = new Date(now);
nextDay.setDate(now.getDate() + 1);
const tomorrow = dateFormat(nextDay, 'yyyy-mm-dd');

const todoListArray = [
  { title: "Task for today", description: "something here", priority: "medium", dueDate: today },
  { title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: tomorrow },
  { title: "Task for next week", description: "something here", priority: "medium", dueDate: "2023-08-21" }
];

const addTodoFormButton = document.querySelector('.add-todo-container');
const addTodoForm = document.querySelector('.add-todo-form');
const cancelForm = document.querySelector('#cancel-form');
const addTodoButton = document.querySelector('#add-todo-button');
const todoTitleInput = document.querySelector('#todo-title-input');
const todoDescriptionInput = document.querySelector('#todo-description-input');
const todoDueDateInput = document.querySelector('#todo-due-date-input');
const todoPriorityInput = document.querySelector('#todo-priority-input');
const todoList = document.querySelector('.todo-list');
const inboxButton = document.querySelector('#inbox');
const todayButton = document.querySelector('#today');
const upcomingButton = document.querySelector('#upcoming');

let currentPage = 'Inbox';

inboxButton.addEventListener('click', (event) => switchTodoListType(event));
todayButton.addEventListener('click', (event) => switchTodoListType(event));
upcomingButton.addEventListener('click', (event) => switchTodoListType(event));


addTodoFormButton.addEventListener('click', toggleForm);

cancelForm.addEventListener('click', toggleForm);

const CreateTodo = function (title, description, dueDate, priority) {
  const todo = {};
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority
  return todo;
}

addTodoButton.addEventListener('click', () => {
  const newTodo = CreateTodo(todoTitleInput.value, todoDescriptionInput.value, todoDueDateInput.value, todoPriorityInput.value);
  todoListArray.push(newTodo);
  toggleForm();
  if (currentPage == 'Inbox') {
    displayTodo(newTodo);
  } else if (currentPage == 'Today' && newTodo.dueDate == today) {
    displayTodo(newTodo);
  } else if (currentPage == 'Upcoming' && newTodo.dueDate !== today) {
    displayTodo(newTodo);
  }
  todoListCounter();
});

function toggleForm() {
  addTodoForm.classList.toggle('hide');
  addTodoFormButton.classList.toggle('hide');
  clearForm();
}

function clearForm() {
  todoTitleInput.value = '';
  todoDescriptionInput.value = '';
  todoDueDateInput.value = '';
  todoPriorityInput.value = '';
}

function displayTodo(todo) {
  const container = document.createElement('div');
  const todoTitle = document.createElement('h4');
  const todoDescription = document.createElement('p');
  const todoPriority = document.createElement('div');
  const todoDueDate = document.createElement('p');
  const flexDiv = document.createElement('div');
  flexDiv.style.cssText = 'display: flex; justify-content: space-evenly; align-items: center;'
  todoTitle.innerHTML = `${todo.title} <i class="fa-solid fa-trash"></i>`;
  todoDescription.textContent = todo.description;
  todoPriority.style.width = '50%';
  todoPriority.style.height = '10px';
  if (todo.priority == 'low' || todo.priority == '') {
    todoPriority.style.backgroundColor = 'green';
  } else if (todo.priority == 'medium') {
    todoPriority.style.backgroundColor = 'orange';
  } else if (todo.priority == 'high') {
    todoPriority.style.backgroundColor = 'red';
  }
  todoDueDate.textContent = calculateRemainingDays(todo.dueDate);
  container.appendChild(todoTitle);
  container.appendChild(todoDescription);
  flexDiv.appendChild(todoPriority);
  flexDiv.appendChild(todoDueDate);
  container.appendChild(flexDiv);
  container.classList.add('todo');
  todoList.appendChild(container);
}

function calculateRemainingDays(dueDate) {
  if (dueDate == today) {
    return `Due today!`;
  } else if (dueDate == tomorrow) {
    return `Due tomorrow!`;
  } else {
    for (let i = 0; i < 100; i++) {
      nextDay.setDate(now.getDate() + i);
      if (dueDate == dateFormat(nextDay, 'yyyy-mm-dd')) {
        return `Due in ${i} days time...`
      }
    }
  }
}


function switchTodoListType(event) {
  const todoListType = document.querySelector('.todo-list-type');
  todoListType.innerHTML = event.target.dataset.index;
  displayTodoList(event.target.dataset.index);
  currentPage = event.target.dataset.index;
}

function displayTodoList(type) {
  todoList.innerHTML = '';
  if (type == 'Inbox') {
    todoListArray.forEach(item => displayTodo(item));
  } else if (type == 'Today') {
    todoListArray.forEach(item => { if (item.dueDate == today) displayTodo(item) });
  } else if (type == 'Upcoming') {
    todoListArray.forEach(item => { if (item.dueDate !== today) displayTodo(item) });
  }
  selectTrashIcons();
}

function todoListCounter() {
  let inboxCounter = 0;
  let todayCounter = 0;
  let upcomingCounter = 0;
  todoListArray.forEach(item => {
    inboxCounter++
    if (item.dueDate == today) todayCounter++;
    if (item.dueDate !== today) upcomingCounter++
  });
  document.querySelector('span[data-index="Inbox"]').textContent = inboxCounter;
  document.querySelector('span[data-index="Today"]').textContent = todayCounter;
  document.querySelector('span[data-index="Upcoming"]').textContent = upcomingCounter;
}

displayTodoList('Inbox');
todoListCounter();

function selectTrashIcons() {
  const trashIcons = document.querySelectorAll('.todo>h4>i');
  trashIcons.forEach(icon => icon.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.remove();
  }))
}

selectTrashIcons();





