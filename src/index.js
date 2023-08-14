import dateFormat, { masks } from "dateformat";
const now = new Date();
const span = document.querySelector('#date');
const todoList = [];

span.textContent = dateFormat(now, "dddd mmmm dS");

const addTodoFormButton = document.querySelector('#add-todo-container');
const addTodoForm = document.querySelector('#add-todo-form');
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
  todoList.push(newTodo);
  console.log(todoList);
  toggleForm();
});

function toggleForm() {
  if (addTodoForm.style.display == 'grid') {
    addTodoForm.style.display = 'none';
  } else if (addTodoForm.style.display == 'none') {
    addTodoForm.style.display = 'grid';
  }
  if (addTodoFormButton.style.display == 'flex') {
    addTodoFormButton.style.display = 'none';
  } else if (addTodoFormButton.style.display == 'none') {
    addTodoFormButton.style.display = 'flex';
  }
}


