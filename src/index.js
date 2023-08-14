import dateFormat, { masks } from "dateformat";
const now = new Date();
const today = dateFormat(now, 'yyyy-mm-dd');
const nextDay = new Date(now);
nextDay.setDate(now.getDate() + 1);
const tomorrow = dateFormat(nextDay, 'yyyy-mm-dd');

const todoListArray = [
  { title: "Task for today", description: "something here", priority: "medium", dueDate: "2023-08-14" },
  { title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: "2023-08-15" },
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
  displayTodo(newTodo);
  console.log(todoListArray);
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
  todoTitle.textContent = todo.title;
  todoDescription.textContent = todo.description;
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
  container.appendChild(todoPriority);
  container.appendChild(todoDueDate);
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
}

const inboxButton = document.querySelector('#inbox');
const todayButton = document.querySelector('#today');
const upcomingButton = document.querySelector('#upcoming');

inboxButton.addEventListener('click', (event) => switchTodoListType(event));
todayButton.addEventListener('click', (event) => switchTodoListType(event));
upcomingButton.addEventListener('click', (event) => switchTodoListType(event));

