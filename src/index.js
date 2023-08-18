import dateFormat from "dateformat";
const now = new Date();
const today = dateFormat(now, 'yyyy-mm-dd');
const nextDay = new Date(now);
nextDay.setDate(now.getDate() + 1);
const tomorrow = dateFormat(nextDay, 'yyyy-mm-dd');

const todoListArrayToday = [{ title: "Task for today", description: "something here", priority: "medium", dueDate: today },
];
const todoListArrayUpcoming = [{ title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: tomorrow },
{ title: "Task for next week", description: "something here", priority: "medium", dueDate: "2023-08-21" }];

const todoListArray = [todoListArrayToday, todoListArrayUpcoming
];

const addTodoFormButton = document.querySelector('.add-todo-container');
const addTodoForm = document.querySelector('.add-todo-form');
const addProjectsFormButton = document.querySelector('.add-projects-container');
const addProjectsForm = document.querySelector('.add-projects-form');
const addProjectsInput = document.querySelector('#add-projects-input');
const addProjectsButton = document.querySelector('#add-projects-button');
const cancelProjectsButton = document.querySelector('#cancel-project-form-button');
const cancelTodoForm = document.querySelector('#cancel-form');
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


addTodoFormButton.addEventListener('click', toggleTodoForm);

cancelTodoForm.addEventListener('click', toggleTodoForm);

addProjectsFormButton.addEventListener('click', toggleProjectForm);

cancelProjectsButton.addEventListener('click', toggleProjectForm);

const CreateTodo = function (title, description, dueDate, priority) {
  const todo = {};
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority
  return todo;
}

addTodoButton.addEventListener('click', addTodo);

addProjectsButton.addEventListener('click', addProject);

function addProject() {
  console.log('hi');
}

function addTodo() {
  const newTodo = CreateTodo(todoTitleInput.value, todoDescriptionInput.value, todoDueDateInput.value, todoPriorityInput.value);
  if (newTodo.dueDate == today) todoListArrayToday.push(newTodo);
  if (newTodo.dueDate !== today) todoListArrayUpcoming.push(newTodo);
  toggleTodoForm();
  displayTodoList();
  todoListCounter();
  console.log(todoListArray);
}

function toggleTodoForm() {
  addTodoForm.classList.toggle('hide');
  addTodoFormButton.classList.toggle('hide');
  clearTodoForm();
}

function toggleProjectForm() {
  addProjectsForm.classList.toggle('hide');
  addProjectsFormButton.classList.toggle('hide');
  clearProjectsForm();
}

function clearProjectsForm() {
  addProjectsInput.value = '';
}

function clearTodoForm() {
  todoTitleInput.value = '';
  todoDescriptionInput.value = '';
  todoDueDateInput.value = '';
  todoPriorityInput.value = '';
}

function displayTodo(todo, index) {
  const container = document.createElement('div');
  container.setAttribute('data-index', index);

  if (todo.dueDate == today) container.classList.add('today');
  if (todo.dueDate !== today) container.classList.add('upmcoming');

  const todoTitle = document.createElement('div');
  todoTitle.classList.add('todo-title');
  const todoTitleText = document.createElement('h4');
  todoTitleText.textContent = todo.title;
  const todoCheckBox = document.createElement('input');
  todoCheckBox.setAttribute('type', 'checkbox');
  const todoTitleWrapper = document.createElement('div');
  todoTitleWrapper.style.cssText = 'display: flex; gap: 1rem; align-items: center;';
  todoTitleWrapper.appendChild(todoCheckBox);
  todoTitleWrapper.appendChild(todoTitleText);
  todoTitle.appendChild(todoTitleWrapper);
  const todoTrashIcon = document.createElement('i');
  todoTrashIcon.classList.add('fa-solid');
  todoTrashIcon.classList.add('fa-trash');
  todoTitle.appendChild(todoTrashIcon);

  const todoDescription = document.createElement('p');
  todoDescription.textContent = todo.description;

  const todoPriority = document.createElement('div');
  todoPriority.style.cssText = 'width: 5rem; height: 1.2rem; border-radius: 10px;';

  if (todo.priority == 'low' || todo.priority == '') {
    todoPriority.style.backgroundColor = 'green';
  } else if (todo.priority == 'medium') {
    todoPriority.style.backgroundColor = 'orange';
  } else if (todo.priority == 'high') {
    todoPriority.style.backgroundColor = 'red';
  }
  const priorityContainer = document.createElement('div');
  priorityContainer.style.cssText = 'padding: 0.5rem; background-color: var(--color3); border-radius: 10px; display: grid; place-items: center;'
  priorityContainer.appendChild(todoPriority);

  const todoDueDate = document.createElement('p');
  todoDueDate.textContent = calculateRemainingDays(todo.dueDate);
  todoDueDate.style.cssText = 'margin: 0;'

  const dueDateContainer = document.createElement('div');
  dueDateContainer.style.cssText = 'padding: 0.5rem; background-color: var(--color3); border-radius: 10px; display: grid; place-items: center;'
  dueDateContainer.appendChild(todoDueDate);

  const flexDiv = document.createElement('div');
  flexDiv.style.cssText = 'display: flex; align-items: center; gap: 2rem;'
  flexDiv.appendChild(priorityContainer);
  flexDiv.appendChild(dueDateContainer);

  container.appendChild(todoTitle);
  container.appendChild(todoDescription);
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

function displayTodoList() {
  todoList.innerHTML = '';
  if (currentPage == 'Inbox') {
    todoListArray.forEach(array => array.forEach((item, index) => displayTodo(item, index)));
  } else if (currentPage == 'Today') {
    todoListArrayToday.forEach((item, index) => { if (item.dueDate == today) displayTodo(item, index) });
  } else if (currentPage == 'Upcoming') {
    todoListArrayUpcoming.forEach((item, index) => { if (item.dueDate !== today) displayTodo(item, index) });
  }
}

function todoListCounter() {
  let inboxCounter = 0;
  let todayCounter = 0;
  let upcomingCounter = 0;
  todoListArray.forEach(array => array.forEach(item => inboxCounter++));
  todoListArrayToday.forEach(item => todayCounter++);
  todoListArrayUpcoming.forEach(item => upcomingCounter++);

  document.querySelector('span[data-index="Inbox"]').textContent = inboxCounter;
  document.querySelector('span[data-index="Today"]').textContent = todayCounter;
  document.querySelector('span[data-index="Upcoming"]').textContent = upcomingCounter;
}

displayTodoList();
todoListCounter();

document.addEventListener('click', (e) => removeTodo);

function removeTodo(e) {
  if (e.target.classList.contains('fa-trash')) {
    if (e.target.parentElement.parentElement.classList.contains('today')) {
      const index = e.target.parentElement.parentElement.dataset.index;
      todoListArrayToday.splice(index, 1);
      displayTodoList();
      todoListCounter();
      console.log(todoListArray);
    } else {
      const index = e.target.parentElement.parentElement.dataset.index;
      todoListArrayUpcoming.splice(index, 1);
      displayTodoList();
      todoListCounter();
      console.log(todoListArray);
    }
  }
}

console.log(todoListArray);





