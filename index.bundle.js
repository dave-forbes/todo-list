/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/TodoArrayFunctions.js":
/*!***********************************!*\
  !*** ./src/TodoArrayFunctions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoArrayFunctions: () => (/* binding */ TodoArrayFunctions)
/* harmony export */ });
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var _UIFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIFunctions */ "./src/UIFunctions.js");



const ui = (0,_UIFunctions__WEBPACK_IMPORTED_MODULE_1__.UIFunctions)();

function TodoArrayFunctions() {

  const now = new Date();
  const today = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(now, 'yyyy-mm-dd');
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);
  const tomorrow = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(nextDay, 'yyyy-mm-dd');

  let todoListArrayToday;
  let todoListArrayUpcoming;
  let todoListCompleted;
  const todoListArray = [];

  // Shit code below to try and access todos on local storage or load in example todos

  if (localStorage.getItem("todoListArrayToday")) {
    todoListArrayToday = JSON.parse(localStorage.getItem("todoListArrayToday"));
    todoListArrayUpcoming = JSON.parse(localStorage.getItem("todoListArrayUpcoming"));
    todoListCompleted = JSON.parse(localStorage.getItem("todoListCompleted"));
  } else {
    todoListArrayToday = [{ title: "Task for today", description: "something here", priority: "medium", dueDate: today, project: 'Inbox', completed: false }];
    todoListArrayUpcoming = [{ title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: tomorrow, project: 'Inbox', completed: false }, { title: "Task for next week", description: "something here", priority: "medium", dueDate: "2023-09-25", project: 'Inbox', completed: false }];
    todoListCompleted = [];
  }

  todoListArray.push(todoListArrayToday);
  todoListArray.push(todoListArrayUpcoming);
  todoListArray.push(todoListCompleted);

  // Shit code above to try and access todos on local storage or load in example todos

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
    if (newTodo.project !== 'Inbox') {
      for (let i = 2; i < todoListArray.length; i++) {
        if (todoListArray[i][0] == newTodo.project) {
          todoListArray[i].push(newTodo);
        }
      }
    }
    console.log(todoListArray);
    updateLocalStorage();
  }

  function addProject(value) {
    const newProject = [value];
    todoListArray.push(newProject);
  }

  function todoListCounter() {
    let inboxCounter = 0;
    let todayCounter = 0;
    let upcomingCounter = 0;
    let completedCounter = 0;

    todoListArray.forEach(array => array.forEach((item) => {
      if (typeof (item) == 'object' && item.completed == false) { inboxCounter++ }
    }));
    ui.displayNumberOfTodos('Inbox', inboxCounter);

    todoListArray.forEach(array => array.forEach((item) => {
      if (item.dueDate == today && typeof (item) == 'object' && item.completed == false) todayCounter++
    }));
    ui.displayNumberOfTodos('Today', todayCounter);

    todoListArray.forEach(array => array.forEach((item) => {
      if (item.dueDate !== today && typeof (item) == 'object' && item.completed == false) upcomingCounter++
    }));
    ui.displayNumberOfTodos('Upcoming', upcomingCounter);

    todoListCompleted.forEach(() => completedCounter++);
    ui.displayNumberOfTodos('Completed', completedCounter);

    for (let i = 3; i < todoListArray.length; i++) {
      let counter = 0;
      todoListArray[i].forEach(item => { if (typeof (item) == 'object') { counter++ } });
      let project = todoListArray[i][0];
      ui.displayNumberOfTodos(project, counter);
    }
  }

  function removeTodo(array, index) {
    todoListArray[array].splice(index, 1);
    updateLocalStorage()
  }

  function completeTodo(array, index) {
    todoListArray[array][index].completed = true;
    const completedTodo = todoListArray[array].splice(index, 1);
    todoListCompleted.push(completedTodo[0]);
    console.log(todoListArray);
    updateLocalStorage();
  }

  function findTodo(array, index) {
    return todoListArray[array][index];
  }

  function updateLocalStorage() {
    localStorage.setItem("todoListArrayToday", JSON.stringify(todoListArrayToday));
    localStorage.setItem("todoListArrayUpcoming", JSON.stringify(todoListArrayUpcoming));
    localStorage.setItem("todoListCompleted", JSON.stringify(todoListCompleted));

    for (let i = 3; i < todoListArray.length; i++) {
      localStorage.setItem(todoListArray[i][0], JSON.stringify(todoListArray[i]));
    }
  }

  return {
    addTodo,
    addProject,
    todoListCounter,
    removeTodo,
    completeTodo,
    findTodo,
    todoListArray,
    todoListCompleted,
    today,
    tomorrow,
    nextDay,
    now,
  }
}

/***/ }),

/***/ "./src/UIFunctions.js":
/*!****************************!*\
  !*** ./src/UIFunctions.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIFunctions: () => (/* binding */ UIFunctions)
/* harmony export */ });
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var _TodoArrayFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoArrayFunctions */ "./src/TodoArrayFunctions.js");



const todoArrayFunctions = (0,_TodoArrayFunctions__WEBPACK_IMPORTED_MODULE_1__.TodoArrayFunctions)();

function UIFunctions() {

  let currentPage = 'Inbox';

  const addTodoFormButton = document.querySelector('.add-todo-container');
  const cancelTodoForm = document.querySelector('#cancel-form');
  const addTodoForm = document.querySelector('.add-todo-form');

  function toggleTodoForm(text) {
    if (todoToEditNode) todoToEditNode.classList.toggle('hide');
    addTodoForm.classList.toggle('hide');
    addTodoFormButton.classList.toggle('hide');
    const addTodoButton = document.querySelector('#add-todo-button');
    addTodoButton.textContent = `${text}`
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
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => {
        if (typeof (item) == 'object' && item.completed == false) displayTodo(item, index)
      }));
    } else if (currentPage == 'Today') {
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => {
        if (item.dueDate == todoArrayFunctions.today && item.completed == false) displayTodo(item, index)
      }));
    } else if (currentPage == 'Upcoming') {
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => {
        if (item.dueDate !== todoArrayFunctions.today && typeof (item) == 'object' && item.completed == false) {
          displayTodo(item, index)
        }
      }));
    } else if (currentPage == 'Completed') {
      todoArrayFunctions.todoListCompleted.forEach((item, index) => displayTodo(item, index));
    } else {
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => {
        if (item.project == currentPage && typeof (item) == 'object' && item.completed == false) {
          displayTodo(item, index)
        }
      }));
    }
  }

  function displayTodo(todo, index) {
    const container = document.createElement('div');
    container.setAttribute('data-index', index);

    if (todo.dueDate == todoArrayFunctions.today && todo.project == 'Inbox') container.classList.add('today');
    if (todo.dueDate !== todoArrayFunctions.today && todo.project == 'Inbox') container.classList.add('upcoming');
    if (todo.project !== 'Inbox') container.classList.add(todo.project);

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
    const todoTitleIconWrapper = document.createElement('div');
    todoTitleIconWrapper.style.cssText = 'display: flex; gap: 2rem;'
    const todoEditIcon = document.createElement('i');
    todoEditIcon.classList.add('fa-solid');
    todoEditIcon.classList.add('fa-pen-to-square');
    const todoTrashIcon = document.createElement('i');
    todoTrashIcon.classList.add('fa-solid');
    todoTrashIcon.classList.add('fa-trash');
    todoTitleIconWrapper.appendChild(todoEditIcon);
    todoTitleIconWrapper.appendChild(todoTrashIcon);
    todoTitle.appendChild(todoTitleIconWrapper);

    const todoDescription = document.createElement('p');
    todoDescription.textContent = todo.description;

    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todo-priority');

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
    priorityContainer.classList.add('todo-priority');
    priorityContainer.classList.add('todo-containers');
    priorityContainer.appendChild(todoPriority);

    const todoDueDate = document.createElement('p');
    todoDueDate.textContent = calculateRemainingDays(todo.dueDate);
    todoDueDate.style.cssText = 'margin: 0;'

    const dueDateContainer = document.createElement('div');
    dueDateContainer.classList.add('todo-due-date');
    dueDateContainer.classList.add('todo-containers');
    dueDateContainer.appendChild(todoDueDate);

    const flexDiv = document.createElement('div');
    flexDiv.style.cssText = 'display: flex; align-items: center; gap: 2rem;'
    flexDiv.appendChild(priorityContainer);
    flexDiv.appendChild(dueDateContainer);
    if (todo.project !== 'Inbox') {
      const projectContainer = document.createElement('div');
      projectContainer.classList.add('todo-project');
      projectContainer.classList.add('todo-containers');
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
    if (dueDate == todoArrayFunctions.today) {
      return `Due today!`;
    } else if (dueDate == todoArrayFunctions.tomorrow) {
      return `Due tomorrow!`;
    } else {
      for (let i = 0; i < 100; i++) {
        todoArrayFunctions.nextDay.setDate(todoArrayFunctions.now.getDate() + i);
        if (dueDate == (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(todoArrayFunctions.nextDay, 'yyyy-mm-dd')) {
          return `Due in ${i} days`
        }
      }
    }
  }

  const sideBar = document.querySelector('.side-bar');

  function switchTodoListType(e) {
    console.log(e.target.parentElement);
    if (e.target.classList.contains('nav-item') ||
      e.target.parentElement.classList.contains('nav-item') ||
      e.target.parentElement.parentElement.classList.contains('nav-item')) {
      if (e.target.classList.contains('add-projects-container') ||
        e.target.parentElement.classList.contains('add-projects-container')) return;
      const todoListType = document.querySelector('.todo-list-type');
      todoListType.innerHTML = e.target.dataset.index;
      currentPage = e.target.dataset.index;
      displayTodoList();
      toggleSideBar();
    }
  }

  function checkCompleteTodo(e) {
    if (e.target.classList.contains('check-box')) {
      const node = e.target.parentElement.parentElement.parentElement;
      const index = node.dataset.index;
      console.log({ node, index })
      node.classList.add('line-through');
      if (node.classList.contains('today')) {
        todoArrayFunctions.completeTodo(0, index);
      } else if (node.classList.contains('upcoming')) {
        todoArrayFunctions.completeTodo(1, index);
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoArrayFunctions.todoListArray.length; i++) {
          if (todoArrayFunctions.todoListArray[i][0] == project) {
            todoArrayFunctions.completeTodo(i, index);
          }
        }
      }
      setTimeout(() => {
        displayTodoList();
        todoArrayFunctions.todoListCounter();
      }, 1000);
    }
  }

  function clickRemoveTodo(e) {
    if (e.target.classList.contains('fa-trash')) {
      const node = e.target.parentElement.parentElement.parentElement;
      const index = node.dataset.index;
      if (node.classList.contains('today')) {
        todoArrayFunctions.removeTodo(0, index);
      } else if (node.classList.contains('upcoming')) {
        todoArrayFunctions.removeTodo(1, index);
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoArrayFunctions.todoListArray.length; i++) {
          if (todoArrayFunctions.todoListArray[i][0] == project) {
            todoArrayFunctions.removeTodo(i, index);
          }
        }
      }
      displayTodoList();
      todoArrayFunctions.todoListCounter();
    }
  }

  function toggleSideBar() {
    sideBar.classList.toggle('side-bar-hide');
  }

  let todoToEdit;
  let todoToEditArray;
  let todoToEditIndex;
  let todoToEditNode;

  function toggleEditTodoForm(e) {
    if (e.target.classList.contains('fa-pen-to-square')) {
      toggleTodoForm('Edit Todo');
      const node = e.target.parentElement.parentElement.parentElement;
      node.classList.toggle('hide');
      const index = node.dataset.index;
      todoToEditIndex = index;
      todoToEditNode = node;
      if (node.classList.contains('today')) {
        todoToEdit = todoArrayFunctions.findTodo(0, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
        todoToEditArray = 0;
      } else if (node.classList.contains('upcoming')) {
        todoToEdit = todoArrayFunctions.findTodo(1, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
        todoToEditArray = 1;
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoArrayFunctions.todoListArray.length; i++) {
          if (todoArrayFunctions.todoListArray[i][0] == project) {
            todoToEdit = todoArrayFunctions.findTodo(i, index);
            todoTitleInput.value = todoToEdit.title;
            todoDescriptionInput.value = todoToEdit.description;
            todoDueDateInput.value = todoToEdit.dueDate;
            todoPriorityInput.value = todoToEdit.priority;
            projectSelect.value = todoToEdit.project;
            todoToEditArray = i;
          }
        }
      }
    }
  }

  function clickEditTodo() {
    todoArrayFunctions.removeTodo(todoToEditArray, todoToEditIndex);
    todoArrayFunctions.addTodo(todoTitleInput.value,
      todoDescriptionInput.value,
      todoDueDateInput.value,
      todoPriorityInput.value,
      projectSelect.value);
    toggleTodoForm();
    displayTodoList();
    todoArrayFunctions.todoListCounter();
  }


  const burgerMenu = document.querySelectorAll('.burger-menu');

  function clearStorage() {
    localStorage.clear();
    location.reload();
  }

  function displayNumberOfTodos(listType, counter) {
    document.querySelector(`span[data-index="${listType}"]`).textContent = counter;
  }

  const clearStorageButton = document.querySelector('#clear-storage-button');

  function eventListeners() {
    addTodoFormButton.addEventListener('click', () => toggleTodoForm('Add Todo'));
    cancelTodoForm.addEventListener('click', toggleTodoForm);
    addProjectsFormButton.addEventListener('click', toggleProjectForm);
    cancelProjectsButton.addEventListener('click', toggleProjectForm);
    addTodoButton.addEventListener('click', () => {
      if (addTodoButton.textContent == 'Add Todo') {
        todoArrayFunctions.addTodo(todoTitleInput.value,
          todoDescriptionInput.value,
          todoDueDateInput.value,
          todoPriorityInput.value,
          projectSelect.value);
        toggleTodoForm();
        displayTodoList();
        todoArrayFunctions.todoListCounter();
      } else {
        clickEditTodo();
      }
    });
    addProjectsButton.addEventListener('click', () => {
      const value = addProjectsInput.value;
      const newValue = value.replaceAll(/\s/g, '-');
      console.log(value);
      todoArrayFunctions.addProject(newValue);
      displayProject(newValue);
      toggleProjectForm();
      todoArrayFunctions.todoListCounter();
    });
    sideBar.addEventListener('click', (e) => switchTodoListType(e));
    document.addEventListener('click', checkCompleteTodo);
    document.addEventListener('click', clickRemoveTodo);
    document.addEventListener('click', toggleEditTodoForm);
    burgerMenu.forEach(menu => menu.addEventListener('click', toggleSideBar));
    clearStorageButton.addEventListener('click', clearStorage);
  }

  return {
    eventListeners,
    displayTodoList,
    displayNumberOfTodos,
    displayProject,
    displayTodo
  }
}

/***/ }),

/***/ "./node_modules/dateformat/lib/dateformat.js":
/*!***************************************************!*\
  !*** ./node_modules/dateformat/lib/dateformat.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dateFormat),
/* harmony export */   formatTimezone: () => (/* binding */ formatTimezone),
/* harmony export */   i18n: () => (/* binding */ i18n),
/* harmony export */   masks: () => (/* binding */ masks)
/* harmony export */ });
var token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;var timezone=/\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;var timezoneClip=/[^-+\dA-Z]/g;function dateFormat(date,mask,utc,gmt){if(arguments.length===1&&typeof date==="string"&&!/\d/.test(date)){mask=date;date=undefined}date=date||date===0?date:new Date;if(!(date instanceof Date)){date=new Date(date)}if(isNaN(date)){throw TypeError("Invalid date")}mask=String(masks[mask]||mask||masks["default"]);var maskSlice=mask.slice(0,4);if(maskSlice==="UTC:"||maskSlice==="GMT:"){mask=mask.slice(4);utc=true;if(maskSlice==="GMT:"){gmt=true}}var _=function _(){return utc?"getUTC":"get"};var _d=function d(){return date[_()+"Date"]()};var D=function D(){return date[_()+"Day"]()};var _m=function m(){return date[_()+"Month"]()};var y=function y(){return date[_()+"FullYear"]()};var _H=function H(){return date[_()+"Hours"]()};var _M=function M(){return date[_()+"Minutes"]()};var _s=function s(){return date[_()+"Seconds"]()};var _L=function L(){return date[_()+"Milliseconds"]()};var _o=function o(){return utc?0:date.getTimezoneOffset()};var _W=function W(){return getWeek(date)};var _N=function N(){return getDayOfWeek(date)};var flags={d:function d(){return _d()},dd:function dd(){return pad(_d())},ddd:function ddd(){return i18n.dayNames[D()]},DDD:function DDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()],short:true})},dddd:function dddd(){return i18n.dayNames[D()+7]},DDDD:function DDDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()+7]})},m:function m(){return _m()+1},mm:function mm(){return pad(_m()+1)},mmm:function mmm(){return i18n.monthNames[_m()]},mmmm:function mmmm(){return i18n.monthNames[_m()+12]},yy:function yy(){return String(y()).slice(2)},yyyy:function yyyy(){return pad(y(),4)},h:function h(){return _H()%12||12},hh:function hh(){return pad(_H()%12||12)},H:function H(){return _H()},HH:function HH(){return pad(_H())},M:function M(){return _M()},MM:function MM(){return pad(_M())},s:function s(){return _s()},ss:function ss(){return pad(_s())},l:function l(){return pad(_L(),3)},L:function L(){return pad(Math.floor(_L()/10))},t:function t(){return _H()<12?i18n.timeNames[0]:i18n.timeNames[1]},tt:function tt(){return _H()<12?i18n.timeNames[2]:i18n.timeNames[3]},T:function T(){return _H()<12?i18n.timeNames[4]:i18n.timeNames[5]},TT:function TT(){return _H()<12?i18n.timeNames[6]:i18n.timeNames[7]},Z:function Z(){return gmt?"GMT":utc?"UTC":formatTimezone(date)},o:function o(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60)*100+Math.abs(_o())%60,4)},p:function p(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function S(){return["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function W(){return _W()},WW:function WW(){return pad(_W())},N:function N(){return _N()}};return mask.replace(token,function(match){if(match in flags){return flags[match]()}return match.slice(1,match.length-1)})}var masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};var i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var pad=function pad(val){var len=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;return String(val).padStart(len,"0")};var getDayName=function getDayName(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref["short"],_short=_ref$short===void 0?false:_ref$short;var today=new Date;var yesterday=new Date;yesterday.setDate(yesterday[_+"Date"]()-1);var tomorrow=new Date;tomorrow.setDate(tomorrow[_+"Date"]()+1);var today_d=function today_d(){return today[_+"Date"]()};var today_m=function today_m(){return today[_+"Month"]()};var today_y=function today_y(){return today[_+"FullYear"]()};var yesterday_d=function yesterday_d(){return yesterday[_+"Date"]()};var yesterday_m=function yesterday_m(){return yesterday[_+"Month"]()};var yesterday_y=function yesterday_y(){return yesterday[_+"FullYear"]()};var tomorrow_d=function tomorrow_d(){return tomorrow[_+"Date"]()};var tomorrow_m=function tomorrow_m(){return tomorrow[_+"Month"]()};var tomorrow_y=function tomorrow_y(){return tomorrow[_+"FullYear"]()};if(today_y()===y&&today_m()===m&&today_d()===d){return _short?"Tdy":"Today"}else if(yesterday_y()===y&&yesterday_m()===m&&yesterday_d()===d){return _short?"Ysd":"Yesterday"}else if(tomorrow_y()===y&&tomorrow_m()===m&&tomorrow_d()===d){return _short?"Tmw":"Tomorrow"}return dayName};var getWeek=function getWeek(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate());targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3);var firstThursday=new Date(targetThursday.getFullYear(),0,4);firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3);var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset();targetThursday.setHours(targetThursday.getHours()-ds);var weekDiff=(targetThursday-firstThursday)/(864e5*7);return 1+Math.floor(weekDiff)};var getDayOfWeek=function getDayOfWeek(date){var dow=date.getDay();if(dow===0){dow=7}return dow};var formatTimezone=function formatTimezone(date){return(String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TodoArrayFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoArrayFunctions */ "./src/TodoArrayFunctions.js");
/* harmony import */ var _UIFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIFunctions */ "./src/UIFunctions.js");




const ui = (0,_UIFunctions__WEBPACK_IMPORTED_MODULE_1__.UIFunctions)();
const todoArrayFunctions = (0,_TodoArrayFunctions__WEBPACK_IMPORTED_MODULE_0__.TodoArrayFunctions)();

ui.eventListeners();
ui.displayTodoList();
todoArrayFunctions.todoListCounter();

// Shit code below to try and retrieve projects from localstorage, display project and corresponding todos


if (localStorage.getItem("todoListArrayToday")) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'todoListCompleted' && localStorage.key(i) !== 'todoListArrayToday' && localStorage.key(i) !== 'todoListArrayUpcoming') {
      todoArrayFunctions.addProject(localStorage.key(i));
      ui.displayProject(localStorage.key(i));
      todoArrayFunctions.todoListCounter();
      const key = localStorage.key(i);
      todoArrayFunctions.todoListArray.forEach(item => {
        if (item[0] == key) {
          item.push(JSON.parse(localStorage.getItem(localStorage.key(i)))[1]);
          todoArrayFunctions.todoListCounter();
          console.log(todoArrayFunctions.todoListArray);
          ui.displayTodo(JSON.parse(localStorage.getItem(localStorage.key(i)))[1], 0);
        }
      })
    }
  }
}

// Shit code above to try and retrieve projects from localstorage, display project and corresponding todos


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7QUFDUTs7QUFFNUMsV0FBVyx5REFBVzs7QUFFZjs7QUFFUDtBQUNBLGdCQUFnQixzREFBVTtBQUMxQjtBQUNBO0FBQ0EsbUJBQW1CLHNEQUFVOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSiw0QkFBNEIsZ0lBQWdJO0FBQzVKLCtCQUErQixzSUFBc0ksSUFBSSwySUFBMkk7QUFDcFQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwwQkFBMEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0VBQWtFO0FBQ2xFLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0EseUNBQXlDLGlDQUFpQyxhQUFhO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SW9DO0FBQ3NCOztBQUUxRCwyQkFBMkIsdUVBQWtCOztBQUV0Qzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxLQUFLO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixPQUFPLHNCQUFzQixNQUFNO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFdBQVcsb0JBQW9CO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELFVBQVU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxxQkFBcUIsVUFBVTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ04sc0JBQXNCLFNBQVM7QUFDL0I7QUFDQSx1QkFBdUIsc0RBQVU7QUFDakMsMkJBQTJCLEdBQUc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLHdCQUF3Qiw2Q0FBNkM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLHdCQUF3Qiw2Q0FBNkM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0Esd0JBQXdCLDZDQUE2QztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxTQUFTO0FBQ3hEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsWUEsYUFBYSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksMkJBQTJCLElBQUksNkJBQTZCLHlCQUF5QixJQUFJLG9CQUFvQixFQUFFLDZHQUE2RywrQkFBOEMsdUNBQXVDLG1FQUFtRSxVQUFVLGVBQWUsa0NBQWtDLDRCQUE0QixvQkFBb0IsZ0JBQWdCLGdDQUFnQyxpREFBaUQsOEJBQThCLDJDQUEyQyxtQkFBbUIsU0FBUyx1QkFBdUIsVUFBVSxtQkFBbUIsMkJBQTJCLG9CQUFvQiwyQkFBMkIsbUJBQW1CLDBCQUEwQixvQkFBb0IsNEJBQTRCLG1CQUFtQiwrQkFBK0Isb0JBQW9CLDRCQUE0QixvQkFBb0IsOEJBQThCLG9CQUFvQiw4QkFBOEIsb0JBQW9CLG1DQUFtQyxvQkFBb0IsdUNBQXVDLG9CQUFvQixzQkFBc0Isb0JBQW9CLDJCQUEyQixXQUFXLGVBQWUsWUFBWSxrQkFBa0IsaUJBQWlCLG9CQUFvQiwwQkFBMEIsb0JBQW9CLG1CQUFtQixnRUFBZ0UsRUFBRSxzQkFBc0IsNEJBQTRCLHNCQUFzQixtQkFBbUIsdURBQXVELEVBQUUsZ0JBQWdCLGNBQWMsa0JBQWtCLG1CQUFtQixvQkFBb0IsNkJBQTZCLHNCQUFzQixnQ0FBZ0Msa0JBQWtCLDRCQUE0QixzQkFBc0Isa0JBQWtCLGdCQUFnQixtQkFBbUIsa0JBQWtCLHdCQUF3QixnQkFBZ0IsWUFBWSxrQkFBa0IsaUJBQWlCLGdCQUFnQixZQUFZLGtCQUFrQixpQkFBaUIsZ0JBQWdCLFlBQVksa0JBQWtCLGlCQUFpQixnQkFBZ0IsbUJBQW1CLGdCQUFnQixnQ0FBZ0MsZ0JBQWdCLG1EQUFtRCxrQkFBa0IsbURBQW1ELGdCQUFnQixtREFBbUQsa0JBQWtCLG1EQUFtRCxnQkFBZ0IsZ0RBQWdELGdCQUFnQixrRkFBa0YsZ0JBQWdCLHFHQUFxRyxnQkFBZ0Isd0VBQXdFLGdCQUFnQixZQUFZLGtCQUFrQixpQkFBaUIsZ0JBQWdCLGNBQWMsMENBQTBDLG1CQUFtQixzQkFBc0IscUNBQXFDLEVBQVMsV0FBVyxvWkFBMlosVUFBVSxnWEFBZ1gsMEJBQTBCLG9FQUFvRSxzQ0FBc0MseUNBQXlDLGtJQUFrSSxtQkFBbUIsdUJBQXVCLDJDQUEyQyxzQkFBc0IseUNBQXlDLCtCQUErQiwwQkFBMEIsK0JBQStCLDJCQUEyQiwrQkFBK0IsOEJBQThCLHVDQUF1Qyw4QkFBOEIsdUNBQXVDLCtCQUErQix1Q0FBdUMsa0NBQWtDLHFDQUFxQyw2QkFBNkIscUNBQXFDLDhCQUE4QixxQ0FBcUMsaUNBQWlDLGdEQUFnRCw0QkFBNEIsaUVBQWlFLGdDQUFnQyw4REFBOEQsK0JBQStCLGdCQUFnQixtQ0FBbUMsK0VBQStFLGlGQUFpRiw2REFBNkQsOEVBQThFLDRFQUE0RSxzREFBc0Qsc0RBQXNELCtCQUErQiw2Q0FBNkMsc0JBQXNCLFlBQVksTUFBTSxZQUFtQixpREFBaUQ7Ozs7OztVQ0F4Mkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEQ7QUFDZDs7O0FBRzVDLFdBQVcseURBQVc7QUFDdEIsMkJBQTJCLHVFQUFrQjs7QUFFN0M7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvQXJyYXlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tIFwiZGF0ZWZvcm1hdFwiO1xuaW1wb3J0IHsgVUlGdW5jdGlvbnMgfSBmcm9tIFwiLi9VSUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB1aSA9IFVJRnVuY3Rpb25zKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2RvQXJyYXlGdW5jdGlvbnMoKSB7XG5cbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgdG9kYXkgPSBkYXRlRm9ybWF0KG5vdywgJ3l5eXktbW0tZGQnKTtcbiAgY29uc3QgbmV4dERheSA9IG5ldyBEYXRlKG5vdyk7XG4gIG5leHREYXkuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpICsgMSk7XG4gIGNvbnN0IHRvbW9ycm93ID0gZGF0ZUZvcm1hdChuZXh0RGF5LCAneXl5eS1tbS1kZCcpO1xuXG4gIGxldCB0b2RvTGlzdEFycmF5VG9kYXk7XG4gIGxldCB0b2RvTGlzdEFycmF5VXBjb21pbmc7XG4gIGxldCB0b2RvTGlzdENvbXBsZXRlZDtcbiAgY29uc3QgdG9kb0xpc3RBcnJheSA9IFtdO1xuXG4gIC8vIFNoaXQgY29kZSBiZWxvdyB0byB0cnkgYW5kIGFjY2VzcyB0b2RvcyBvbiBsb2NhbCBzdG9yYWdlIG9yIGxvYWQgaW4gZXhhbXBsZSB0b2Rvc1xuXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9MaXN0QXJyYXlUb2RheVwiKSkge1xuICAgIHRvZG9MaXN0QXJyYXlUb2RheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdEFycmF5VG9kYXlcIikpO1xuICAgIHRvZG9MaXN0QXJyYXlVcGNvbWluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdEFycmF5VXBjb21pbmdcIikpO1xuICAgIHRvZG9MaXN0Q29tcGxldGVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9MaXN0Q29tcGxldGVkXCIpKTtcbiAgfSBlbHNlIHtcbiAgICB0b2RvTGlzdEFycmF5VG9kYXkgPSBbeyB0aXRsZTogXCJUYXNrIGZvciB0b2RheVwiLCBkZXNjcmlwdGlvbjogXCJzb21ldGhpbmcgaGVyZVwiLCBwcmlvcml0eTogXCJtZWRpdW1cIiwgZHVlRGF0ZTogdG9kYXksIHByb2plY3Q6ICdJbmJveCcsIGNvbXBsZXRlZDogZmFsc2UgfV07XG4gICAgdG9kb0xpc3RBcnJheVVwY29taW5nID0gW3sgdGl0bGU6IFwiVGFzayBmb3IgdG9tb3Jyb3dcIiwgZGVzY3JpcHRpb246IFwic29tZXRoaW5nIGhlcmVcIiwgcHJpb3JpdHk6IFwibWVkaXVtXCIsIGR1ZURhdGU6IHRvbW9ycm93LCBwcm9qZWN0OiAnSW5ib3gnLCBjb21wbGV0ZWQ6IGZhbHNlIH0sIHsgdGl0bGU6IFwiVGFzayBmb3IgbmV4dCB3ZWVrXCIsIGRlc2NyaXB0aW9uOiBcInNvbWV0aGluZyBoZXJlXCIsIHByaW9yaXR5OiBcIm1lZGl1bVwiLCBkdWVEYXRlOiBcIjIwMjMtMDktMjVcIiwgcHJvamVjdDogJ0luYm94JywgY29tcGxldGVkOiBmYWxzZSB9XTtcbiAgICB0b2RvTGlzdENvbXBsZXRlZCA9IFtdO1xuICB9XG5cbiAgdG9kb0xpc3RBcnJheS5wdXNoKHRvZG9MaXN0QXJyYXlUb2RheSk7XG4gIHRvZG9MaXN0QXJyYXkucHVzaCh0b2RvTGlzdEFycmF5VXBjb21pbmcpO1xuICB0b2RvTGlzdEFycmF5LnB1c2godG9kb0xpc3RDb21wbGV0ZWQpO1xuXG4gIC8vIFNoaXQgY29kZSBhYm92ZSB0byB0cnkgYW5kIGFjY2VzcyB0b2RvcyBvbiBsb2NhbCBzdG9yYWdlIG9yIGxvYWQgaW4gZXhhbXBsZSB0b2Rvc1xuXG4gIGNvbnN0IENyZWF0ZVRvZG8gPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY29tcGxldGVkKSB7XG4gICAgY29uc3QgdG9kbyA9IHt9O1xuICAgIHRvZG8udGl0bGUgPSB0aXRsZTtcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdG9kby5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0b2RvLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB0b2RvLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRvZG8uY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIHJldHVybiB0b2RvO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgY29uc3QgbmV3VG9kbyA9IENyZWF0ZVRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgZmFsc2UpO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgPT0gdG9kYXkgJiYgbmV3VG9kby5wcm9qZWN0ID09ICdJbmJveCcpIHRvZG9MaXN0QXJyYXlUb2RheS5wdXNoKG5ld1RvZG8pO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgIT09IHRvZGF5ICYmIG5ld1RvZG8ucHJvamVjdCA9PSAnSW5ib3gnKSB0b2RvTGlzdEFycmF5VXBjb21pbmcucHVzaChuZXdUb2RvKTtcbiAgICBpZiAobmV3VG9kby5wcm9qZWN0ICE9PSAnSW5ib3gnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9MaXN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRvZG9MaXN0QXJyYXlbaV1bMF0gPT0gbmV3VG9kby5wcm9qZWN0KSB7XG4gICAgICAgICAgdG9kb0xpc3RBcnJheVtpXS5wdXNoKG5ld1RvZG8pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0QXJyYXkpO1xuICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvamVjdCh2YWx1ZSkge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBbdmFsdWVdO1xuICAgIHRvZG9MaXN0QXJyYXkucHVzaChuZXdQcm9qZWN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZG9MaXN0Q291bnRlcigpIHtcbiAgICBsZXQgaW5ib3hDb3VudGVyID0gMDtcbiAgICBsZXQgdG9kYXlDb3VudGVyID0gMDtcbiAgICBsZXQgdXBjb21pbmdDb3VudGVyID0gMDtcbiAgICBsZXQgY29tcGxldGVkQ291bnRlciA9IDA7XG5cbiAgICB0b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIHsgaW5ib3hDb3VudGVyKysgfVxuICAgIH0pKTtcbiAgICB1aS5kaXNwbGF5TnVtYmVyT2ZUb2RvcygnSW5ib3gnLCBpbmJveENvdW50ZXIpO1xuXG4gICAgdG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmR1ZURhdGUgPT0gdG9kYXkgJiYgdHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JyAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgdG9kYXlDb3VudGVyKytcbiAgICB9KSk7XG4gICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MoJ1RvZGF5JywgdG9kYXlDb3VudGVyKTtcblxuICAgIHRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5kdWVEYXRlICE9PSB0b2RheSAmJiB0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSB1cGNvbWluZ0NvdW50ZXIrK1xuICAgIH0pKTtcbiAgICB1aS5kaXNwbGF5TnVtYmVyT2ZUb2RvcygnVXBjb21pbmcnLCB1cGNvbWluZ0NvdW50ZXIpO1xuXG4gICAgdG9kb0xpc3RDb21wbGV0ZWQuZm9yRWFjaCgoKSA9PiBjb21wbGV0ZWRDb3VudGVyKyspO1xuICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKCdDb21wbGV0ZWQnLCBjb21wbGV0ZWRDb3VudGVyKTtcblxuICAgIGZvciAobGV0IGkgPSAzOyBpIDwgdG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgdG9kb0xpc3RBcnJheVtpXS5mb3JFYWNoKGl0ZW0gPT4geyBpZiAodHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JykgeyBjb3VudGVyKysgfSB9KTtcbiAgICAgIGxldCBwcm9qZWN0ID0gdG9kb0xpc3RBcnJheVtpXVswXTtcbiAgICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKHByb2plY3QsIGNvdW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRvZG8oYXJyYXksIGluZGV4KSB7XG4gICAgdG9kb0xpc3RBcnJheVthcnJheV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGxldGVUb2RvKGFycmF5LCBpbmRleCkge1xuICAgIHRvZG9MaXN0QXJyYXlbYXJyYXldW2luZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRvZG8gPSB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRvZG9MaXN0Q29tcGxldGVkLnB1c2goY29tcGxldGVkVG9kb1swXSk7XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kVG9kbyhhcnJheSwgaW5kZXgpIHtcbiAgICByZXR1cm4gdG9kb0xpc3RBcnJheVthcnJheV1baW5kZXhdO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb0xpc3RBcnJheVRvZGF5XCIsIEpTT04uc3RyaW5naWZ5KHRvZG9MaXN0QXJyYXlUb2RheSkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb0xpc3RBcnJheVVwY29taW5nXCIsIEpTT04uc3RyaW5naWZ5KHRvZG9MaXN0QXJyYXlVcGNvbWluZykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb0xpc3RDb21wbGV0ZWRcIiwgSlNPTi5zdHJpbmdpZnkodG9kb0xpc3RDb21wbGV0ZWQpKTtcblxuICAgIGZvciAobGV0IGkgPSAzOyBpIDwgdG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odG9kb0xpc3RBcnJheVtpXVswXSwgSlNPTi5zdHJpbmdpZnkodG9kb0xpc3RBcnJheVtpXSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkVG9kbyxcbiAgICBhZGRQcm9qZWN0LFxuICAgIHRvZG9MaXN0Q291bnRlcixcbiAgICByZW1vdmVUb2RvLFxuICAgIGNvbXBsZXRlVG9kbyxcbiAgICBmaW5kVG9kbyxcbiAgICB0b2RvTGlzdEFycmF5LFxuICAgIHRvZG9MaXN0Q29tcGxldGVkLFxuICAgIHRvZGF5LFxuICAgIHRvbW9ycm93LFxuICAgIG5leHREYXksXG4gICAgbm93LFxuICB9XG59IiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSBcImRhdGVmb3JtYXRcIjtcbmltcG9ydCB7IFRvZG9BcnJheUZ1bmN0aW9ucyB9IGZyb20gXCIuL1RvZG9BcnJheUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB0b2RvQXJyYXlGdW5jdGlvbnMgPSBUb2RvQXJyYXlGdW5jdGlvbnMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFVJRnVuY3Rpb25zKCkge1xuXG4gIGxldCBjdXJyZW50UGFnZSA9ICdJbmJveCc7XG5cbiAgY29uc3QgYWRkVG9kb0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG8tY29udGFpbmVyJyk7XG4gIGNvbnN0IGNhbmNlbFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbmNlbC1mb3JtJyk7XG4gIGNvbnN0IGFkZFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10b2RvLWZvcm0nKTtcblxuICBmdW5jdGlvbiB0b2dnbGVUb2RvRm9ybSh0ZXh0KSB7XG4gICAgaWYgKHRvZG9Ub0VkaXROb2RlKSB0b2RvVG9FZGl0Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgYWRkVG9kb0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgIGFkZFRvZG9Gb3JtQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgICBjb25zdCBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvLWJ1dHRvbicpO1xuICAgIGFkZFRvZG9CdXR0b24udGV4dENvbnRlbnQgPSBgJHt0ZXh0fWBcbiAgICBjbGVhclRvZG9Gb3JtKCk7XG4gIH1cblxuICBjb25zdCBhZGRQcm9qZWN0c0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3RzLWNvbnRhaW5lcicpO1xuICBjb25zdCBjYW5jZWxQcm9qZWN0c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwtcHJvamVjdC1mb3JtLWJ1dHRvbicpO1xuICBjb25zdCBhZGRQcm9qZWN0c0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3RzLWZvcm0nKTtcblxuICBmdW5jdGlvbiB0b2dnbGVQcm9qZWN0Rm9ybSgpIHtcbiAgICBhZGRQcm9qZWN0c0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgIGFkZFByb2plY3RzRm9ybUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgY2xlYXJQcm9qZWN0c0Zvcm0oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHRpdGxlKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0aW9uLnZhbHVlID0gdGl0bGU7XG4gICAgb3B0aW9uLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICBjb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cycpO1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCBwcm9qZWN0VHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcbiAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWRpYWdyYW0tcHJvamVjdCcpO1xuICAgIHAuaW5uZXJIVE1MID0gYCR7dGl0bGV9IC0gPHNwYW4gZGF0YS1pbmRleD1cIiR7dGl0bGV9XCI+PC9zcGFuPmA7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ25hdi1pdGVtJylcbiAgICBkaXYuYXBwZW5kQ2hpbGQocHJvamVjdFRyYXNoSWNvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKHApO1xuICAgIHByb2plY3RzRGl2LmFwcGVuZENoaWxkKGRpdik7XG4gICAgcC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB0aXRsZSk7XG4gICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB0aXRsZSk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHRpdGxlKTtcbiAgfVxuXG4gIGNvbnN0IGFkZFByb2plY3RzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3RzLWlucHV0Jyk7XG4gIGNvbnN0IHRvZG9UaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUtaW5wdXQnKTtcbiAgY29uc3QgdG9kb0Rlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1kZXNjcmlwdGlvbi1pbnB1dCcpO1xuICBjb25zdCB0b2RvRHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZHVlLWRhdGUtaW5wdXQnKTtcbiAgY29uc3QgdG9kb1ByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1wcmlvcml0eS1pbnB1dCcpO1xuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc2VsZWN0Jyk7XG4gIGNvbnN0IGFkZFByb2plY3RzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0cy1idXR0b24nKTtcbiAgY29uc3QgYWRkVG9kb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdG9kby1idXR0b24nKTtcblxuICBmdW5jdGlvbiBjbGVhclByb2plY3RzRm9ybSgpIHtcbiAgICBhZGRQcm9qZWN0c0lucHV0LnZhbHVlID0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRvZG9Gb3JtKCkge1xuICAgIHRvZG9UaXRsZUlucHV0LnZhbHVlID0gJyc7XG4gICAgdG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSAnJztcbiAgICB0b2RvRHVlRGF0ZUlucHV0LnZhbHVlID0gJyc7XG4gICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuXG4gIGZ1bmN0aW9uIGRpc3BsYXlUb2RvTGlzdCgpIHtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ0luYm94Jykge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JyAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgZGlzcGxheVRvZG8oaXRlbSwgaW5kZXgpXG4gICAgICB9KSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PSAnVG9kYXknKSB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleClcbiAgICAgIH0pKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09ICdVcGNvbWluZycpIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZHVlRGF0ZSAhPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleClcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT0gJ0NvbXBsZXRlZCcpIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvbXBsZXRlZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZGlzcGxheVRvZG8oaXRlbSwgaW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5wcm9qZWN0ID09IGN1cnJlbnRQYWdlICYmIHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIHtcbiAgICAgICAgICBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleClcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlUb2RvKHRvZG8sIGluZGV4KSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcblxuICAgIGlmICh0b2RvLmR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIHRvZG8ucHJvamVjdCA9PSAnSW5ib3gnKSBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcbiAgICBpZiAodG9kby5kdWVEYXRlICE9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9kYXkgJiYgdG9kby5wcm9qZWN0ID09ICdJbmJveCcpIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd1cGNvbWluZycpO1xuICAgIGlmICh0b2RvLnByb2plY3QgIT09ICdJbmJveCcpIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRvZG8ucHJvamVjdCk7XG5cbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby10aXRsZScpO1xuICAgIGNvbnN0IHRvZG9UaXRsZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgIHRvZG9UaXRsZVRleHQudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuICAgIGNvbnN0IHRvZG9DaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdG9kb0NoZWNrQm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgIHRvZG9DaGVja0JveC5jbGFzc0xpc3QuYWRkKCdjaGVjay1ib3gnKTtcbiAgICBjb25zdCB0b2RvVGl0bGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb1RpdGxlV3JhcHBlci5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IGZsZXg7IGdhcDogMXJlbTsgYWxpZ24taXRlbXM6IGNlbnRlcjsnO1xuICAgIHRvZG9UaXRsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0NoZWNrQm94KTtcbiAgICB0b2RvVGl0bGVXcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9UaXRsZVRleHQpO1xuICAgIHRvZG9UaXRsZS5hcHBlbmRDaGlsZCh0b2RvVGl0bGVXcmFwcGVyKTtcbiAgICBjb25zdCB0b2RvVGl0bGVJY29uV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9UaXRsZUljb25XcmFwcGVyLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogZmxleDsgZ2FwOiAycmVtOydcbiAgICBjb25zdCB0b2RvRWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgdG9kb0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gICAgdG9kb0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXBlbi10by1zcXVhcmUnKTtcbiAgICBjb25zdCB0b2RvVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHRvZG9UcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcbiAgICB0b2RvVHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXRyYXNoJyk7XG4gICAgdG9kb1RpdGxlSWNvbldyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0VkaXRJY29uKTtcbiAgICB0b2RvVGl0bGVJY29uV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvVHJhc2hJY29uKTtcbiAgICB0b2RvVGl0bGUuYXBwZW5kQ2hpbGQodG9kb1RpdGxlSWNvbldyYXBwZXIpO1xuXG4gICAgY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndG9kby1wcmlvcml0eScpO1xuXG4gICAgaWYgKHRvZG8ucHJpb3JpdHkgPT0gJ2xvdycgfHwgdG9kby5wcmlvcml0eSA9PSAnJykge1xuICAgICAgdG9kb1ByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gICAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnTG93IFByaW9yaXR5JztcbiAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT0gJ21lZGl1bScpIHtcbiAgICAgIHRvZG9Qcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICAgIHRvZG9Qcmlvcml0eS50ZXh0Q29udGVudCA9ICdNZWRpdW0gUHJpb3JpdHknO1xuICAgIH0gZWxzZSBpZiAodG9kby5wcmlvcml0eSA9PSAnaGlnaCcpIHtcbiAgICAgIHRvZG9Qcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgIHRvZG9Qcmlvcml0eS50ZXh0Q29udGVudCA9ICdIaWdoIFByaW9yaXR5JztcbiAgICB9XG4gICAgY29uc3QgcHJpb3JpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmlvcml0eUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RvLXByaW9yaXR5Jyk7XG4gICAgcHJpb3JpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kby1jb250YWluZXJzJyk7XG4gICAgcHJpb3JpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb1ByaW9yaXR5KTtcblxuICAgIGNvbnN0IHRvZG9EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRvZG9EdWVEYXRlLnRleHRDb250ZW50ID0gY2FsY3VsYXRlUmVtYWluaW5nRGF5cyh0b2RvLmR1ZURhdGUpO1xuICAgIHRvZG9EdWVEYXRlLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOydcblxuICAgIGNvbnN0IGR1ZURhdGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkdWVEYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tZHVlLWRhdGUnKTtcbiAgICBkdWVEYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY29udGFpbmVycycpO1xuICAgIGR1ZURhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0R1ZURhdGUpO1xuXG4gICAgY29uc3QgZmxleERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZsZXhEaXYuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDJyZW07J1xuICAgIGZsZXhEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlDb250YWluZXIpO1xuICAgIGZsZXhEaXYuYXBwZW5kQ2hpbGQoZHVlRGF0ZUNvbnRhaW5lcik7XG4gICAgaWYgKHRvZG8ucHJvamVjdCAhPT0gJ0luYm94Jykge1xuICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RvLXByb2plY3QnKTtcbiAgICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kby1jb250YWluZXJzJyk7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IHRvZG8ucHJvamVjdDtcbiAgICAgIGZsZXhEaXYuYXBwZW5kQ2hpbGQocHJvamVjdENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKHRvZG8uY29tcGxldGVkID09IHRydWUpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsaW5lLXRocm91Z2gnKTtcbiAgICAgIHRvZG9UcmFzaEljb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRvZG9DaGVja0JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRvZG9DaGVja0JveC5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9EZXNjcmlwdGlvbik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZsZXhEaXYpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlbWFpbmluZ0RheXMoZHVlRGF0ZSkge1xuICAgIGlmIChkdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSkge1xuICAgICAgcmV0dXJuIGBEdWUgdG9kYXkhYDtcbiAgICB9IGVsc2UgaWYgKGR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvbW9ycm93KSB7XG4gICAgICByZXR1cm4gYER1ZSB0b21vcnJvdyFgO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5uZXh0RGF5LnNldERhdGUodG9kb0FycmF5RnVuY3Rpb25zLm5vdy5nZXREYXRlKCkgKyBpKTtcbiAgICAgICAgaWYgKGR1ZURhdGUgPT0gZGF0ZUZvcm1hdCh0b2RvQXJyYXlGdW5jdGlvbnMubmV4dERheSwgJ3l5eXktbW0tZGQnKSkge1xuICAgICAgICAgIHJldHVybiBgRHVlIGluICR7aX0gZGF5c2BcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZS1iYXInKTtcblxuICBmdW5jdGlvbiBzd2l0Y2hUb2RvTGlzdFR5cGUoZSkge1xuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1pdGVtJykgfHxcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtaXRlbScpIHx8XG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtaXRlbScpKSB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdHMtY29udGFpbmVyJykgfHxcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0cy1jb250YWluZXInKSkgcmV0dXJuO1xuICAgICAgY29uc3QgdG9kb0xpc3RUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC10eXBlJyk7XG4gICAgICB0b2RvTGlzdFR5cGUuaW5uZXJIVE1MID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgIGN1cnJlbnRQYWdlID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgdG9nZ2xlU2lkZUJhcigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrQ29tcGxldGVUb2RvKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVjay1ib3gnKSkge1xuICAgICAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgaW5kZXggPSBub2RlLmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zb2xlLmxvZyh7IG5vZGUsIGluZGV4IH0pXG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2xpbmUtdGhyb3VnaCcpO1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2RheScpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oMCwgaW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygndXBjb21pbmcnKSkge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuY29tcGxldGVUb2RvKDEsIGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBub2RlLmNsYXNzTGlzdFswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheVtpXVswXSA9PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuY29tcGxldGVUb2RvKGksIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkaXNwbGF5VG9kb0xpc3QoKTtcbiAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xpY2tSZW1vdmVUb2RvKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS10cmFzaCcpKSB7XG4gICAgICBjb25zdCBub2RlID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBpbmRleCA9IG5vZGUuZGF0YXNldC5pbmRleDtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygndG9kYXknKSkge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMucmVtb3ZlVG9kbygwLCBpbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd1cGNvbWluZycpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5yZW1vdmVUb2RvKDEsIGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBub2RlLmNsYXNzTGlzdFswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheVtpXVswXSA9PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMucmVtb3ZlVG9kbyhpLCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkaXNwbGF5VG9kb0xpc3QoKTtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVTaWRlQmFyKCkge1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZS1iYXItaGlkZScpO1xuICB9XG5cbiAgbGV0IHRvZG9Ub0VkaXQ7XG4gIGxldCB0b2RvVG9FZGl0QXJyYXk7XG4gIGxldCB0b2RvVG9FZGl0SW5kZXg7XG4gIGxldCB0b2RvVG9FZGl0Tm9kZTtcblxuICBmdW5jdGlvbiB0b2dnbGVFZGl0VG9kb0Zvcm0oZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLXBlbi10by1zcXVhcmUnKSkge1xuICAgICAgdG9nZ2xlVG9kb0Zvcm0oJ0VkaXQgVG9kbycpO1xuICAgICAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgICBjb25zdCBpbmRleCA9IG5vZGUuZGF0YXNldC5pbmRleDtcbiAgICAgIHRvZG9Ub0VkaXRJbmRleCA9IGluZGV4O1xuICAgICAgdG9kb1RvRWRpdE5vZGUgPSBub2RlO1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2RheScpKSB7XG4gICAgICAgIHRvZG9Ub0VkaXQgPSB0b2RvQXJyYXlGdW5jdGlvbnMuZmluZFRvZG8oMCwgaW5kZXgpO1xuICAgICAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQudGl0bGU7XG4gICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnByaW9yaXR5O1xuICAgICAgICB0b2RvVG9FZGl0QXJyYXkgPSAwO1xuICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygndXBjb21pbmcnKSkge1xuICAgICAgICB0b2RvVG9FZGl0ID0gdG9kb0FycmF5RnVuY3Rpb25zLmZpbmRUb2RvKDEsIGluZGV4KTtcbiAgICAgICAgdG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnRpdGxlO1xuICAgICAgICB0b2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZGVzY3JpcHRpb247XG4gICAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LmR1ZURhdGU7XG4gICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5wcmlvcml0eTtcbiAgICAgICAgdG9kb1RvRWRpdEFycmF5ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBub2RlLmNsYXNzTGlzdFswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheVtpXVswXSA9PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICB0b2RvVG9FZGl0ID0gdG9kb0FycmF5RnVuY3Rpb25zLmZpbmRUb2RvKGksIGluZGV4KTtcbiAgICAgICAgICAgIHRvZG9UaXRsZUlucHV0LnZhbHVlID0gdG9kb1RvRWRpdC50aXRsZTtcbiAgICAgICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LmR1ZURhdGU7XG4gICAgICAgICAgICB0b2RvUHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQucHJpb3JpdHk7XG4gICAgICAgICAgICBwcm9qZWN0U2VsZWN0LnZhbHVlID0gdG9kb1RvRWRpdC5wcm9qZWN0O1xuICAgICAgICAgICAgdG9kb1RvRWRpdEFycmF5ID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGlja0VkaXRUb2RvKCkge1xuICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5yZW1vdmVUb2RvKHRvZG9Ub0VkaXRBcnJheSwgdG9kb1RvRWRpdEluZGV4KTtcbiAgICB0b2RvQXJyYXlGdW5jdGlvbnMuYWRkVG9kbyh0b2RvVGl0bGVJbnB1dC52YWx1ZSxcbiAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSxcbiAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlLFxuICAgICAgcHJvamVjdFNlbGVjdC52YWx1ZSk7XG4gICAgdG9nZ2xlVG9kb0Zvcm0oKTtcbiAgICBkaXNwbGF5VG9kb0xpc3QoKTtcbiAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb3VudGVyKCk7XG4gIH1cblxuXG4gIGNvbnN0IGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnVyZ2VyLW1lbnUnKTtcblxuICBmdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5TnVtYmVyT2ZUb2RvcyhsaXN0VHlwZSwgY291bnRlcikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNwYW5bZGF0YS1pbmRleD1cIiR7bGlzdFR5cGV9XCJdYCkudGV4dENvbnRlbnQgPSBjb3VudGVyO1xuICB9XG5cbiAgY29uc3QgY2xlYXJTdG9yYWdlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLXN0b3JhZ2UtYnV0dG9uJyk7XG5cbiAgZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgYWRkVG9kb0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVUb2RvRm9ybSgnQWRkIFRvZG8nKSk7XG4gICAgY2FuY2VsVG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVUb2RvRm9ybSk7XG4gICAgYWRkUHJvamVjdHNGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUHJvamVjdEZvcm0pO1xuICAgIGNhbmNlbFByb2plY3RzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUHJvamVjdEZvcm0pO1xuICAgIGFkZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoYWRkVG9kb0J1dHRvbi50ZXh0Q29udGVudCA9PSAnQWRkIFRvZG8nKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5hZGRUb2RvKHRvZG9UaXRsZUlucHV0LnZhbHVlLFxuICAgICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgICAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUsXG4gICAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUsXG4gICAgICAgICAgcHJvamVjdFNlbGVjdC52YWx1ZSk7XG4gICAgICAgIHRvZ2dsZVRvZG9Gb3JtKCk7XG4gICAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb3VudGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGlja0VkaXRUb2RvKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYWRkUHJvamVjdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGFkZFByb2plY3RzSW5wdXQudmFsdWU7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlLnJlcGxhY2VBbGwoL1xccy9nLCAnLScpO1xuICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmFkZFByb2plY3QobmV3VmFsdWUpO1xuICAgICAgZGlzcGxheVByb2plY3QobmV3VmFsdWUpO1xuICAgICAgdG9nZ2xlUHJvamVjdEZvcm0oKTtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICB9KTtcbiAgICBzaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHN3aXRjaFRvZG9MaXN0VHlwZShlKSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlVG9kbyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1JlbW92ZVRvZG8pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRWRpdFRvZG9Gb3JtKTtcbiAgICBidXJnZXJNZW51LmZvckVhY2gobWVudSA9PiBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2lkZUJhcikpO1xuICAgIGNsZWFyU3RvcmFnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyU3RvcmFnZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV2ZW50TGlzdGVuZXJzLFxuICAgIGRpc3BsYXlUb2RvTGlzdCxcbiAgICBkaXNwbGF5TnVtYmVyT2ZUb2RvcyxcbiAgICBkaXNwbGF5UHJvamVjdCxcbiAgICBkaXNwbGF5VG9kb1xuICB9XG59IiwidmFyIHRva2VuPS9kezEsNH18RHszLDR9fG17MSw0fXx5eSg/Onl5KT98KFtIaE1zVHRdKVxcMT98V3sxLDJ9fFtMbG9wU1pOXXxcIlteXCJdKlwifCdbXiddKicvZzt2YXIgdGltZXpvbmU9L1xcYig/OltBLVpdezEsM31bQS1aXVtUQ10pKD86Wy0rXVxcZHs0fSk/fCgoPzpBdXN0cmFsaWFuICk/KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWUpXFxiL2c7dmFyIHRpbWV6b25lQ2xpcD0vW14tK1xcZEEtWl0vZztleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRlRm9ybWF0KGRhdGUsbWFzayx1dGMsZ210KXtpZihhcmd1bWVudHMubGVuZ3RoPT09MSYmdHlwZW9mIGRhdGU9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKG1hc2tzW21hc2tdfHxtYXNrfHxtYXNrc1tcImRlZmF1bHRcIl0pO3ZhciBtYXNrU2xpY2U9bWFzay5zbGljZSgwLDQpO2lmKG1hc2tTbGljZT09PVwiVVRDOlwifHxtYXNrU2xpY2U9PT1cIkdNVDpcIil7bWFzaz1tYXNrLnNsaWNlKDQpO3V0Yz10cnVlO2lmKG1hc2tTbGljZT09PVwiR01UOlwiKXtnbXQ9dHJ1ZX19dmFyIF89ZnVuY3Rpb24gXygpe3JldHVybiB1dGM/XCJnZXRVVENcIjpcImdldFwifTt2YXIgX2Q9ZnVuY3Rpb24gZCgpe3JldHVybiBkYXRlW18oKStcIkRhdGVcIl0oKX07dmFyIEQ9ZnVuY3Rpb24gRCgpe3JldHVybiBkYXRlW18oKStcIkRheVwiXSgpfTt2YXIgX209ZnVuY3Rpb24gbSgpe3JldHVybiBkYXRlW18oKStcIk1vbnRoXCJdKCl9O3ZhciB5PWZ1bmN0aW9uIHkoKXtyZXR1cm4gZGF0ZVtfKCkrXCJGdWxsWWVhclwiXSgpfTt2YXIgX0g9ZnVuY3Rpb24gSCgpe3JldHVybiBkYXRlW18oKStcIkhvdXJzXCJdKCl9O3ZhciBfTT1mdW5jdGlvbiBNKCl7cmV0dXJuIGRhdGVbXygpK1wiTWludXRlc1wiXSgpfTt2YXIgX3M9ZnVuY3Rpb24gcygpe3JldHVybiBkYXRlW18oKStcIlNlY29uZHNcIl0oKX07dmFyIF9MPWZ1bmN0aW9uIEwoKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaWxsaXNlY29uZHNcIl0oKX07dmFyIF9vPWZ1bmN0aW9uIG8oKXtyZXR1cm4gdXRjPzA6ZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpfTt2YXIgX1c9ZnVuY3Rpb24gVygpe3JldHVybiBnZXRXZWVrKGRhdGUpfTt2YXIgX049ZnVuY3Rpb24gTigpe3JldHVybiBnZXREYXlPZldlZWsoZGF0ZSl9O3ZhciBmbGFncz17ZDpmdW5jdGlvbiBkKCl7cmV0dXJuIF9kKCl9LGRkOmZ1bmN0aW9uIGRkKCl7cmV0dXJuIHBhZChfZCgpKX0sZGRkOmZ1bmN0aW9uIGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpXSxzaG9ydDp0cnVlfSl9LGRkZGQ6ZnVuY3Rpb24gZGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKSs3XX0sRERERDpmdW5jdGlvbiBEREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKV19LG1tbW06ZnVuY3Rpb24gbW1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKSsxMl19LHl5OmZ1bmN0aW9uIHl5KCl7cmV0dXJuIFN0cmluZyh5KCkpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uIHl5eXkoKXtyZXR1cm4gcGFkKHkoKSw0KX0saDpmdW5jdGlvbiBoKCl7cmV0dXJuIF9IKCklMTJ8fDEyfSxoaDpmdW5jdGlvbiBoaCgpe3JldHVybiBwYWQoX0goKSUxMnx8MTIpfSxIOmZ1bmN0aW9uIEgoKXtyZXR1cm4gX0goKX0sSEg6ZnVuY3Rpb24gSEgoKXtyZXR1cm4gcGFkKF9IKCkpfSxNOmZ1bmN0aW9uIE0oKXtyZXR1cm4gX00oKX0sTU06ZnVuY3Rpb24gTU0oKXtyZXR1cm4gcGFkKF9NKCkpfSxzOmZ1bmN0aW9uIHMoKXtyZXR1cm4gX3MoKX0sc3M6ZnVuY3Rpb24gc3MoKXtyZXR1cm4gcGFkKF9zKCkpfSxsOmZ1bmN0aW9uIGwoKXtyZXR1cm4gcGFkKF9MKCksMyl9LEw6ZnVuY3Rpb24gTCgpe3JldHVybiBwYWQoTWF0aC5mbG9vcihfTCgpLzEwKSl9LHQ6ZnVuY3Rpb24gdCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzBdOmkxOG4udGltZU5hbWVzWzFdfSx0dDpmdW5jdGlvbiB0dCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzJdOmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s0XTppMThuLnRpbWVOYW1lc1s1XX0sVFQ6ZnVuY3Rpb24gVFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s2XTppMThuLnRpbWVOYW1lc1s3XX0sWjpmdW5jdGlvbiBaKCl7cmV0dXJuIGdtdD9cIkdNVFwiOnV0Yz9cIlVUQ1wiOmZvcm1hdFRpbWV6b25lKGRhdGUpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9ZXhwb3J0IHZhciBtYXNrcz17ZGVmYXVsdDpcImRkZCBtbW0gZGQgeXl5eSBISDpNTTpzc1wiLHNob3J0RGF0ZTpcIm0vZC95eVwiLHBhZGRlZFNob3J0RGF0ZTpcIm1tL2RkL3l5eXlcIixtZWRpdW1EYXRlOlwibW1tIGQsIHl5eXlcIixsb25nRGF0ZTpcIm1tbW0gZCwgeXl5eVwiLGZ1bGxEYXRlOlwiZGRkZCwgbW1tbSBkLCB5eXl5XCIsc2hvcnRUaW1lOlwiaDpNTSBUVFwiLG1lZGl1bVRpbWU6XCJoOk1NOnNzIFRUXCIsbG9uZ1RpbWU6XCJoOk1NOnNzIFRUIFpcIixpc29EYXRlOlwieXl5eS1tbS1kZFwiLGlzb1RpbWU6XCJISDpNTTpzc1wiLGlzb0RhdGVUaW1lOlwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzb1wiLGlzb1V0Y0RhdGVUaW1lOlwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiLGV4cGlyZXNIZWFkZXJGb3JtYXQ6XCJkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFpcIn07ZXhwb3J0IHZhciBpMThuPXtkYXlOYW1lczpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIixcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLG1vbnRoTmFtZXM6W1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiLFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLHRpbWVOYW1lczpbXCJhXCIsXCJwXCIsXCJhbVwiLFwicG1cIixcIkFcIixcIlBcIixcIkFNXCIsXCJQTVwiXX07dmFyIHBhZD1mdW5jdGlvbiBwYWQodmFsKXt2YXIgbGVuPWFyZ3VtZW50cy5sZW5ndGg+MSYmYXJndW1lbnRzWzFdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1sxXToyO3JldHVybiBTdHJpbmcodmFsKS5wYWRTdGFydChsZW4sXCIwXCIpfTt2YXIgZ2V0RGF5TmFtZT1mdW5jdGlvbiBnZXREYXlOYW1lKF9yZWYpe3ZhciB5PV9yZWYueSxtPV9yZWYubSxkPV9yZWYuZCxfPV9yZWYuXyxkYXlOYW1lPV9yZWYuZGF5TmFtZSxfcmVmJHNob3J0PV9yZWZbXCJzaG9ydFwiXSxfc2hvcnQ9X3JlZiRzaG9ydD09PXZvaWQgMD9mYWxzZTpfcmVmJHNob3J0O3ZhciB0b2RheT1uZXcgRGF0ZTt2YXIgeWVzdGVyZGF5PW5ldyBEYXRlO3llc3RlcmRheS5zZXREYXRlKHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpLTEpO3ZhciB0b21vcnJvdz1uZXcgRGF0ZTt0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93W18rXCJEYXRlXCJdKCkrMSk7dmFyIHRvZGF5X2Q9ZnVuY3Rpb24gdG9kYXlfZCgpe3JldHVybiB0b2RheVtfK1wiRGF0ZVwiXSgpfTt2YXIgdG9kYXlfbT1mdW5jdGlvbiB0b2RheV9tKCl7cmV0dXJuIHRvZGF5W18rXCJNb250aFwiXSgpfTt2YXIgdG9kYXlfeT1mdW5jdGlvbiB0b2RheV95KCl7cmV0dXJuIHRvZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgeWVzdGVyZGF5X2Q9ZnVuY3Rpb24geWVzdGVyZGF5X2QoKXtyZXR1cm4geWVzdGVyZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfbT1mdW5jdGlvbiB5ZXN0ZXJkYXlfbSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfeT1mdW5jdGlvbiB5ZXN0ZXJkYXlfeSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB0b21vcnJvd19kPWZ1bmN0aW9uIHRvbW9ycm93X2QoKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkRhdGVcIl0oKX07dmFyIHRvbW9ycm93X209ZnVuY3Rpb24gdG9tb3Jyb3dfbSgpe3JldHVybiB0b21vcnJvd1tfK1wiTW9udGhcIl0oKX07dmFyIHRvbW9ycm93X3k9ZnVuY3Rpb24gdG9tb3Jyb3dfeSgpe3JldHVybiB0b21vcnJvd1tfK1wiRnVsbFllYXJcIl0oKX07aWYodG9kYXlfeSgpPT09eSYmdG9kYXlfbSgpPT09bSYmdG9kYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRkeVwiOlwiVG9kYXlcIn1lbHNlIGlmKHllc3RlcmRheV95KCk9PT15JiZ5ZXN0ZXJkYXlfbSgpPT09bSYmeWVzdGVyZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJZc2RcIjpcIlllc3RlcmRheVwifWVsc2UgaWYodG9tb3Jyb3dfeSgpPT09eSYmdG9tb3Jyb3dfbSgpPT09bSYmdG9tb3Jyb3dfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRtd1wiOlwiVG9tb3Jyb3dcIn1yZXR1cm4gZGF5TmFtZX07dmFyIGdldFdlZWs9ZnVuY3Rpb24gZ2V0V2VlayhkYXRlKXt2YXIgdGFyZ2V0VGh1cnNkYXk9bmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSxkYXRlLmdldERhdGUoKSk7dGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCktKHRhcmdldFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGZpcnN0VGh1cnNkYXk9bmV3IERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RnVsbFllYXIoKSwwLDQpO2ZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKS0oZmlyc3RUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBkcz10YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpLWZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTt0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpLWRzKTt2YXIgd2Vla0RpZmY9KHRhcmdldFRodXJzZGF5LWZpcnN0VGh1cnNkYXkpLyg4NjRlNSo3KTtyZXR1cm4gMStNYXRoLmZsb29yKHdlZWtEaWZmKX07dmFyIGdldERheU9mV2Vlaz1mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSl7dmFyIGRvdz1kYXRlLmdldERheSgpO2lmKGRvdz09PTApe2Rvdz03fXJldHVybiBkb3d9O2V4cG9ydCB2YXIgZm9ybWF0VGltZXpvbmU9ZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUoZGF0ZSl7cmV0dXJuKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvZG9BcnJheUZ1bmN0aW9ucyB9IGZyb20gXCIuL1RvZG9BcnJheUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHsgVUlGdW5jdGlvbnMgfSBmcm9tIFwiLi9VSUZ1bmN0aW9uc1wiO1xuXG5cbmNvbnN0IHVpID0gVUlGdW5jdGlvbnMoKTtcbmNvbnN0IHRvZG9BcnJheUZ1bmN0aW9ucyA9IFRvZG9BcnJheUZ1bmN0aW9ucygpO1xuXG51aS5ldmVudExpc3RlbmVycygpO1xudWkuZGlzcGxheVRvZG9MaXN0KCk7XG50b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb3VudGVyKCk7XG5cbi8vIFNoaXQgY29kZSBiZWxvdyB0byB0cnkgYW5kIHJldHJpZXZlIHByb2plY3RzIGZyb20gbG9jYWxzdG9yYWdlLCBkaXNwbGF5IHByb2plY3QgYW5kIGNvcnJlc3BvbmRpbmcgdG9kb3NcblxuXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdEFycmF5VG9kYXlcIikpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmtleShpKSAhPT0gJ3RvZG9MaXN0Q29tcGxldGVkJyAmJiBsb2NhbFN0b3JhZ2Uua2V5KGkpICE9PSAndG9kb0xpc3RBcnJheVRvZGF5JyAmJiBsb2NhbFN0b3JhZ2Uua2V5KGkpICE9PSAndG9kb0xpc3RBcnJheVVwY29taW5nJykge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmFkZFByb2plY3QobG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICB1aS5kaXNwbGF5UHJvamVjdChsb2NhbFN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbVswXSA9PSBrZXkpIHtcbiAgICAgICAgICBpdGVtLnB1c2goSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSlbMV0pO1xuICAgICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheSk7XG4gICAgICAgICAgdWkuZGlzcGxheVRvZG8oSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2Uua2V5KGkpKSlbMV0sIDApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG4vLyBTaGl0IGNvZGUgYWJvdmUgdG8gdHJ5IGFuZCByZXRyaWV2ZSBwcm9qZWN0cyBmcm9tIGxvY2Fsc3RvcmFnZSwgZGlzcGxheSBwcm9qZWN0IGFuZCBjb3JyZXNwb25kaW5nIHRvZG9zXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==