import dateFormat, { masks } from "dateformat";
const now = new Date();
const span = document.querySelector('#date');

span.textContent = dateFormat(now, "dddd mmmm dS");

const addTodoFormButton = document.querySelector('#add-todo-container');
const addTodoForm = document.querySelector('#add-todo-form');
const cancelForm = document.querySelector('#cancel-form')


addTodoFormButton.addEventListener('click', () => {
  addTodoForm.style.display = 'grid';
  addTodoFormButton.style.display = 'none';
})

cancelForm.addEventListener('click', () => {
  addTodoForm.style.display = 'none';
  addTodoFormButton.style.display = 'block';
})

