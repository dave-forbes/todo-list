import dateFormat from "dateformat";
const now = new Date();
const today = dateFormat(now, 'yyyy-mm-dd');
const nextDay = new Date(now);
nextDay.setDate(now.getDate() + 1);
const tomorrow = dateFormat(nextDay, 'yyyy-mm-dd');

const todoListArrayToday = [{ title: "Task for today", description: "something here", priority: "medium", dueDate: today, project: 'Inbox', completed: false },
];
const todoListArrayUpcoming = [{ title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: tomorrow, project: 'Inbox', completed: false },
{ title: "Task for next week", description: "something here", priority: "medium", dueDate: "2023-08-28", project: 'Inbox', completed: false }];

const todoListCompleted = [];

const project = ['Project', { title: 'Study Web Development', description: '', dueDate: '2023-08-25', priority: '', project: 'Project', completed: false }];

const todoListArray = [todoListArrayToday, todoListArrayUpcoming, todoListCompleted, project];

let currentPage = 'Inbox';

const ui = UIFunctions();

ui.eventListeners();
ui.displayTodoList();
todoListCounter();

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


function addTodo(title, description, dueDate, priority, project) {
  const newTodo = CreateTodo(title, description, dueDate, priority, project, false);
  if (newTodo.dueDate == today && newTodo.project == 'Inbox') todoListArrayToday.push(newTodo);
  if (newTodo.dueDate !== today && newTodo.project == 'Inbox') todoListArrayUpcoming.push(newTodo);
  if (newTodo.dueDate !== today && newTodo.project !== 'Inbox') {
    for (let i = 2; i < todoListArray.length; i++) {
      if (todoListArray[i][0] == newTodo.project) {
        todoListArray[i].push(newTodo);
      }
    }
  }
  console.log(todoListArray);
}

function addProject(value) {
  const newProject = [value];
  todoListArray.push(newProject);
  console.log(todoListArray);
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
    ui.displayNumberOfTodos(project, counter);
  }

  ui.displayNumberOfTodos('Inbox', inboxCounter);
  ui.displayNumberOfTodos('Today', todayCounter);
  ui.displayNumberOfTodos('Upcoming', upcomingCounter);
  ui.displayNumberOfTodos('Completed', completedCounter);
}

function removeTodo(array, index) {
  todoListArray[array].splice(index, 1);
}

function completeTodo(array, index) {
  todoListArray[array][index].completed = true;
  const completedTodo = todoListArray[array].splice(index, 1);
  todoListCompleted.push(completedTodo[0]);
  console.log(todoListArray);
}

function UIFunctions() {

  const addTodoFormButton = document.querySelector('.add-todo-container');
  const cancelTodoForm = document.querySelector('#cancel-form');
  const addTodoForm = document.querySelector('.add-todo-form');

  const toggleTodoForm = () => {
    addTodoForm.classList.toggle('hide');
    addTodoFormButton.classList.toggle('hide');
    clearTodoForm();
  }

  const addProjectsFormButton = document.querySelector('.add-projects-container');
  const cancelProjectsButton = document.querySelector('#cancel-project-form-button');
  const addProjectsForm = document.querySelector('.add-projects-form');

  function toggleProjectForm() {
    addProjectsForm.classList.toggle('hide');
    addProjectsFormButton.classList.toggle('hide');
    clearProjectsForm();
  }

  function displayProject(title) {
    const option = document.createElement('option');
    option.value = title;
    option.innerHTML = title;
    projectSelect.appendChild(option);
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
  }

  const addProjectsInput = document.querySelector('#add-projects-input');
  const todoTitleInput = document.querySelector('#todo-title-input');
  const todoDescriptionInput = document.querySelector('#todo-description-input');
  const todoDueDateInput = document.querySelector('#todo-due-date-input');
  const todoPriorityInput = document.querySelector('#todo-priority-input');
  const projectSelect = document.querySelector('#project-select');
  const addProjectsButton = document.querySelector('#add-projects-button');
  const addTodoButton = document.querySelector('#add-todo-button');

  function clearProjectsForm() {
    addProjectsInput.value = '';
  }

  function clearTodoForm() {
    todoTitleInput.value = '';
    todoDescriptionInput.value = '';
    todoDueDateInput.value = '';
    todoPriorityInput.value = '';
  }

  const todoList = document.querySelector('.todo-list');

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

  function displayTodo(todo, index) {
    const container = document.createElement('div');
    container.setAttribute('data-index', index);

    if (todo.dueDate == today && todo.project == 'Inbox') container.classList.add('today');
    if (todo.dueDate !== today && todo.project == 'Inbox') container.classList.add('upcoming');
    if (todo.dueDate !== today && todo.project !== 'Inbox') container.classList.add(todo.project);

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
    if (todo.project !== 'Inbox') {
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

  function checkCompleteTodo(e) {
    if (e.target.classList.contains('check-box')) {
      const node = e.target.parentElement.parentElement.parentElement;
      const index = node.dataset.index;
      console.log({ node, index })
      node.classList.add('line-through');
      if (node.classList.contains('today')) {
        completeTodo(0, index);
      } else if (node.classList.contains('upcoming')) {
        completeTodo(1, index);
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoListArray.length; i++) {
          if (todoListArray[i][0] == project) {
            completeTodo(i, index)
          }
        }
      }
      setTimeout(() => {
        displayTodoList();
        todoListCounter();
      }, 1000);
    }
  }

  function clickRemoveTodo(e) {
    if (e.target.classList.contains('fa-trash')) {
      const node = e.target.parentElement.parentElement;
      const index = node.dataset.index;
      if (node.classList.contains('today')) {
        removeTodo(0, index);
      } else if (node.classList.contains('upcoming')) {
        removeTodo(1, index);
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoListArray.length; i++) {
          if (todoListArray[i][0] == project) {
            removeTodo(i, index);
          }
        }
      }
      displayTodoList();
      todoListCounter();
      console.log(todoListArray);
    }
  }

  function eventListeners() {
    addTodoFormButton.addEventListener('click', toggleTodoForm);
    cancelTodoForm.addEventListener('click', toggleTodoForm);
    addProjectsFormButton.addEventListener('click', toggleProjectForm);
    cancelProjectsButton.addEventListener('click', toggleProjectForm);
    addTodoButton.addEventListener('click', () => {
      addTodo(todoTitleInput.value,
        todoDescriptionInput.value,
        todoDueDateInput.value,
        todoPriorityInput.value,
        projectSelect.value);
      toggleTodoForm();
      displayTodoList();
      todoListCounter();
    });
    addProjectsButton.addEventListener('click', () => {
      addProject(addProjectsInput.value);
      displayProject(addProjectsInput.value);
      toggleProjectForm();
    });
    sideBar.addEventListener('click', (e) => switchTodoListType(e));
    document.addEventListener('click', checkCompleteTodo);
    document.addEventListener('click', clickRemoveTodo);
  }

  function displayNumberOfTodos(listType, counter) {
    document.querySelector(`span[data-index="${listType}"]`).textContent = counter;
  }

  return {
    eventListeners,
    displayTodoList,
    displayNumberOfTodos
  }
}



function todoFunctions() {

}