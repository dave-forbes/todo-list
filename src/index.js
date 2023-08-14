import dateFormat, { masks } from "dateformat";
const now = new Date();
const span = document.querySelector('.date');
const todoListArray = [];

span.textContent = dateFormat(now, "dddd mmmm dS");

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

