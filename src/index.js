import dateFormat from "dateformat";
const now = new Date();
const today = dateFormat(now, 'yyyy-mm-dd');
const nextDay = new Date(now);
nextDay.setDate(now.getDate() + 1);
const tomorrow = dateFormat(nextDay, 'yyyy-mm-dd');

const todoListArrayToday = [{ title: "Task for today", description: "something here", priority: "medium", dueDate: today, completed: false },
];
const todoListArrayUpcoming = [{ title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: tomorrow, completed: false },
{ title: "Task for next week", description: "something here", priority: "medium", dueDate: "2023-08-28", completed: false }];

const todoListCompleted = [];

const project = ['Project', { title: 'Study Web Development', description: '', dueDate: '2023-08-25', priority: '', project: 'Project', completed: false }];

const todoListArray = [todoListArrayToday, todoListArrayUpcoming, todoListCompleted, project];

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
const projectSelect = document.querySelector('#project-select')

let currentPage = 'Inbox';

addTodoFormButton.addEventListener('click', toggleTodoForm);

cancelTodoForm.addEventListener('click', toggleTodoForm);

addProjectsFormButton.addEventListener('click', toggleProjectForm);

cancelProjectsButton.addEventListener('click', toggleProjectForm);

const CreateTodo = function (title, description, dueDate, priority, project, completed) {
  const todo = {};
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority
  todo.project = project;
  todo.completed = completed;
  return todo;
}

addTodoButton.addEventListener('click', addTodo);

addProjectsButton.addEventListener('click', addProject);

function addProject() {
  const newProject = [addProjectsInput.value];
  todoListArray.push(newProject);
  const projectSelect = document.querySelector('#project-select');
  const option = document.createElement('option');
  option.value = addProjectsInput.value;
  option.innerHTML = addProjectsInput.value;
  projectSelect.appendChild(option);
  console.log(todoListArray);
  displayProject(addProjectsInput.value);
}

function displayProject(title) {
  const projectsDiv = document.querySelector('#projects');
  const p = document.createElement('p');
  p.style.textAlign = 'center';
  const projectTrashIcon = document.createElement('i');
  projectTrashIcon.classList.add('fa-solid');
  projectTrashIcon.classList.add('fa-diagram-project');
  p.innerHTML = `${title} - <span data-index="${title}"></span>`;
  const div = document.createElement('div');
  div.classList.add('nav-item')
  div.appendChild(projectTrashIcon);
  div.appendChild(p);
  projectsDiv.appendChild(div);
  p.setAttribute('data-index', title);
  projectTrashIcon.setAttribute('data-index', title);
  div.setAttribute('data-index', title);
  toggleProjectForm();
}

function addTodo() {
  const newTodo = CreateTodo(todoTitleInput.value, todoDescriptionInput.value, todoDueDateInput.value, todoPriorityInput.value, projectSelect.value, false);
  if (newTodo.dueDate == today && newTodo.hasOwnProperty('project') === false) todoListArrayToday.push(newTodo);
  if (newTodo.dueDate !== today && newTodo.hasOwnProperty('project') === false) todoListArrayUpcoming.push(newTodo);
  if (newTodo.hasOwnProperty('project')) {
    for (let i = 2; i < todoListArray.length; i++) {
      if (todoListArray[i][0] == newTodo.project) {
        todoListArray[i].push(newTodo);
      }
    }
  }

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

  if (todo.dueDate == today && todo.hasOwnProperty('project') === false) container.classList.add('today');
  if (todo.dueDate !== today && todo.hasOwnProperty('project') === false) container.classList.add('upcoming');
  if (todo.hasOwnProperty('project')) container.classList.add(todo.project);

  const todoTitle = document.createElement('div');
  todoTitle.classList.add('todo-title');
  const todoTitleText = document.createElement('h4');
  todoTitleText.textContent = todo.title;
  const todoCheckBox = document.createElement('input');
  todoCheckBox.setAttribute('type', 'checkbox');
  todoCheckBox.classList.add('check-box');
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
  todoPriority.style.cssText = 'border-radius: 6px; font-size: 0.7rem; padding:0.2rem 0.4rem; display: grid; place-items: center; font-weight: 600;';

  if (todo.priority == 'low' || todo.priority == '') {
    todoPriority.style.backgroundColor = 'green';
    todoPriority.textContent = 'Low Priority';
  } else if (todo.priority == 'medium') {
    todoPriority.style.backgroundColor = 'orange';
    todoPriority.textContent = 'Medium Priority';
  } else if (todo.priority == 'high') {
    todoPriority.style.backgroundColor = 'red';
    todoPriority.textContent = 'High Priority';
  }
  const priorityContainer = document.createElement('div');
  priorityContainer.style.cssText = 'padding: 0.4rem; background-color: var(--color3); border-radius: 10px; display: grid; place-items: center;'
  priorityContainer.appendChild(todoPriority);

  const todoDueDate = document.createElement('p');
  todoDueDate.textContent = calculateRemainingDays(todo.dueDate);
  todoDueDate.style.cssText = 'margin: 0;'

  const dueDateContainer = document.createElement('div');
  dueDateContainer.style.cssText = 'font-size: 0.9rem; padding: 0.5rem; background-color: var(--color3); border-radius: 10px; display: grid; place-items: center;'
  dueDateContainer.appendChild(todoDueDate);

  const flexDiv = document.createElement('div');
  flexDiv.style.cssText = 'display: flex; align-items: center; gap: 2rem;'
  flexDiv.appendChild(priorityContainer);
  flexDiv.appendChild(dueDateContainer);
  if (todo.hasOwnProperty('project')) {
    const projectContainer = document.createElement('div');
    projectContainer.style.cssText = 'font-size: 0.9rem; padding: 0.5rem; background-color: var(--color3); border-radius: 10px; display: grid; place-items: center;'
    projectContainer.innerHTML = todo.project;
    flexDiv.appendChild(projectContainer);
  }

  if (todo.completed == true) {
    container.classList.add('line-through');
    todoTrashIcon.style.display = 'none';
    todoCheckBox.checked = true;
    todoCheckBox.disabled = true;
  }

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
        return `Due in ${i} days`
      }
    }
  }
}

const sideBar = document.querySelector('.side-bar');

sideBar.addEventListener('click', (e) => switchTodoListType(e));

function switchTodoListType(e) {
  console.log(e.target.parentElement);
  if (e.target.classList.contains('nav-item') || e.target.parentElement.classList.contains('nav-item') || e.target.parentElement.parentElement.classList.contains('nav-item')) {
    if (e.target.classList.contains('add-projects-container') || e.target.parentElement.classList.contains('add-projects-container')) return;
    const todoListType = document.querySelector('.todo-list-type');
    todoListType.innerHTML = e.target.dataset.index;
    currentPage = e.target.dataset.index;
    displayTodoList();
    console.log(currentPage);
  }
}

function displayTodoList() {
  todoList.innerHTML = '';
  if (currentPage == 'Inbox') {
    todoListArray.forEach(array => array.forEach((item, index) => { if (typeof (item) == 'object' && item.completed == false) displayTodo(item, index) }));
  } else if (currentPage == 'Today') {
    todoListArray.forEach(array => array.forEach((item, index) => { if (item.dueDate == today && item.completed == false) displayTodo(item, index) }));
  } else if (currentPage == 'Upcoming') {
    todoListArray.forEach(array => array.forEach((item, index) => { if (item.dueDate !== today && typeof (item) == 'object' && item.completed == false) displayTodo(item, index) }));
  } else if (currentPage == 'Completed') {
    todoListCompleted.forEach((item, index) => displayTodo(item, index));
  } else {
    todoListArray.forEach(array => array.forEach((item, index) => { if (item.project == currentPage && typeof (item) == 'object' && item.completed == false) displayTodo(item, index) }));
  }
}

function todoListCounter() {
  let inboxCounter = 0;
  let todayCounter = 0;
  let upcomingCounter = 0;
  let completedCounter = 0;
  todoListArray.forEach(array => array.forEach((item) => {
    if (typeof (item) == 'object' && item.completed == false) { inboxCounter++ }
  }));
  todoListArray.forEach(array => array.forEach((item) => {
    if (item.dueDate == today && typeof (item) == 'object' && item.completed == false) todayCounter++
  }));
  todoListArray.forEach(array => array.forEach((item) => {
    if (item.dueDate !== today && typeof (item) == 'object' && item.completed == false) upcomingCounter++
  }));

  todoListCompleted.forEach(() => completedCounter++);

  for (let i = 3; i < todoListArray.length; i++) {
    let counter = 0;
    todoListArray[i].forEach(item => { if (typeof (item) == 'object') { counter++ } });
    let project = todoListArray[i][0];
    document.querySelector(`span[data-index="${project}"]`).textContent = counter;
  }

  document.querySelector('span[data-index="Inbox"]').textContent = inboxCounter;
  document.querySelector('span[data-index="Today"]').textContent = todayCounter;
  document.querySelector('span[data-index="Upcoming"]').textContent = upcomingCounter;
  document.querySelector('span[data-index="Completed"]').textContent = completedCounter;
}

displayTodoList();
todoListCounter();

document.addEventListener('click', (e) => removeTodo(e));

function removeTodo(e) {
  if (e.target.classList.contains('fa-trash')) {
    if (e.target.parentElement.parentElement.classList.contains('today')) {
      const index = e.target.parentElement.parentElement.dataset.index;
      todoListArrayToday.splice(index, 1);
      displayTodoList();
      todoListCounter();
      console.log(todoListArray);
    } else if (e.target.parentElement.parentElement.classList.contains('upcoming')) {
      const index = e.target.parentElement.parentElement.dataset.index;
      todoListArrayUpcoming.splice(index, 1);
      displayTodoList();
      todoListCounter();
      console.log(todoListArray);
    } else {
      const project = e.target.parentElement.parentElement.classList[0];
      const index = e.target.parentElement.parentElement.dataset.index;
      for (let i = 2; i < todoListArray.length; i++) {
        if (todoListArray[i][0] == project) {
          todoListArray[i].splice(index, 1);
        }
      }
      displayTodoList();
      console.log(todoListArray);
      todoListCounter();
    }
  }
}

document.addEventListener('click', (e) => completeTodo(e));

function completeTodo(e) {
  if (e.target.classList.contains('check-box')) {
    if (e.target.parentElement.parentElement.parentElement.classList.contains('today')) {
      e.target.parentElement.parentElement.parentElement.classList.add('line-through');
      setTimeout(() => {
        const index = e.target.parentElement.parentElement.parentElement.dataset.index;
        todoListArrayToday[index].completed = true;
        const completedTodo = todoListArrayToday.splice(index, 1);
        todoListCompleted.push(completedTodo[0]);
        displayTodoList();
        todoListCounter();
      }, 1000);
    } else if (e.target.parentElement.parentElement.parentElement.classList.contains('upcoming')) {
      e.target.parentElement.parentElement.parentElement.classList.add('line-through');
      setTimeout(() => {
        const index = e.target.parentElement.parentElement.parentElement.dataset.index;
        todoListArrayUpcoming[index].completed = true;
        const completedTodo = todoListArrayUpcoming.splice(index, 1);
        todoListCompleted.push(completedTodo[0]);
        displayTodoList();
        todoListCounter();
      }, 1000);
    } else {
      const project = e.target.parentElement.parentElement.parentElement.classList[0];
      console.log(e.target.parentElement.parentElement.parentElement);
      e.target.parentElement.parentElement.parentElement.classList.add('line-through');
      for (let i = 2; i < todoListArray.length; i++) {
        if (todoListArray[i][0] == project) {
          setTimeout(() => {
            const index = e.target.parentElement.parentElement.parentElement.dataset.index;
            todoListArray[i][index].completed = true;
            const completedTodo = todoListArray[i].splice(index, 1);
            todoListCompleted.push(completedTodo[0]);
            displayTodoList();
            todoListCounter();
          }, 1000);
        }
      }

    }
  }
}

