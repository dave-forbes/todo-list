// import dateFormat, { masks } from "dateformat";
const todoListArray = [];


const addTodoFormButton = document.querySelector('.add-todo-container');
const addTodoForm = document.querySelector('.add-todo-form');
const cancelForm = document.querySelector('#cancel-form');
const addTodoButton = document.querySelector('#add-todo-button');
const todoTitleInput = document.querySelector('#todo-title-input');
const todoDescriptionInput = document.querySelector('#todo-description-input');
const todoDueDateInput = document.querySelector('#todo-due-date-input');
const todoPriorityInput = document.querySelector('#todo-priority-input');


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
  const todoList = document.querySelector('.todo-list');
  const container = document.createElement('div');
  const todoTitle = document.createElement('h4');
  const todoDescription = document.createElement('p');
  const todoPriority = document.createElement('div');
  todoTitle.textContent = todo.title;
  todoDescription.textContent = todo.description;
  todoPriority.style.height = '10px';
  if (todo.priority == 'low') {
    todoPriority.style.backgroundColor = 'green';
  } else if (todo.priority == 'medium') {
    todoPriority.style.backgroundColor = 'orange';
  } else if (todo.priority == 'high') {
    todoPriority.style.backgroundColor = 'red';
  }

  container.appendChild(todoTitle);
  container.appendChild(todoDescription);
  container.appendChild(todoPriority);
  container.classList.add('todo');
  todoList.appendChild(container);
}

function switchTodoListType(event) {
  console.log(event.target.dataset.index);
  const h3 = document.querySelector('.todo-list-type');
  h3.innerHTML = event.target.dataset.index;
}

const inboxButton = document.querySelector('#inbox');
const todayButton = document.querySelector('#today');
const upcomingButton = document.querySelector('#upcoming');

inboxButton.addEventListener('click', (event) => switchTodoListType(event));
todayButton.addEventListener('click', (event) => switchTodoListType(event));
upcomingButton.addEventListener('click', (event) => switchTodoListType(event));


