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

  const todoListArrayToday = [{ title: "Task for today", description: "something here", priority: "medium", dueDate: today, project: 'Inbox', completed: false },
  ];
  const todoListArrayUpcoming = [{ title: "Task for tomorrow", description: "something here", priority: "medium", dueDate: tomorrow, project: 'Inbox', completed: false },
  { title: "Task for next week", description: "something here", priority: "medium", dueDate: "2023-08-28", project: 'Inbox', completed: false }];

  const todoListCompleted = [];

  const project = ['Project', { title: 'Study Web Development', description: '', dueDate: '2023-08-25', priority: '', project: 'Project', completed: false }];

  const todoListArray = [todoListArrayToday, todoListArrayUpcoming, todoListCompleted, project];

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
  }

  function completeTodo(array, index) {
    todoListArray[array][index].completed = true;
    const completedTodo = todoListArray[array].splice(index, 1);
    todoListCompleted.push(completedTodo[0]);
    console.log(todoListArray);
  }

  function findTodo(array, index) {
    return todoListArray[array][index];
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
    now
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

  const toggleTodoForm = (text) => {
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
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => { if (typeof (item) == 'object' && item.completed == false) displayTodo(item, index) }));
    } else if (currentPage == 'Today') {
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => { if (item.dueDate == todoArrayFunctions.today && item.completed == false) displayTodo(item, index) }));
    } else if (currentPage == 'Upcoming') {
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => { if (item.dueDate !== todoArrayFunctions.today && typeof (item) == 'object' && item.completed == false) displayTodo(item, index) }));
    } else if (currentPage == 'Completed') {
      todoArrayFunctions.todoListCompleted.forEach((item, index) => displayTodo(item, index));
    } else {
      todoArrayFunctions.todoListArray.forEach(array => array.forEach((item, index) => { if (item.project == currentPage && typeof (item) == 'object' && item.completed == false) displayTodo(item, index) }));
    }
  }

  function displayTodo(todo, index) {
    const container = document.createElement('div');
    container.setAttribute('data-index', index);

    if (todo.dueDate == todoArrayFunctions.today && todo.project == 'Inbox') container.classList.add('today');
    if (todo.dueDate !== todoArrayFunctions.today && todo.project == 'Inbox') container.classList.add('upcoming');
    if (todo.dueDate !== todoArrayFunctions.today && todo.project !== 'Inbox') container.classList.add(todo.project);

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
    if (e.target.classList.contains('nav-item') || e.target.parentElement.classList.contains('nav-item') || e.target.parentElement.parentElement.classList.contains('nav-item')) {
      if (e.target.classList.contains('add-projects-container') || e.target.parentElement.classList.contains('add-projects-container')) return;
      const todoListType = document.querySelector('.todo-list-type');
      todoListType.innerHTML = e.target.dataset.index;
      currentPage = e.target.dataset.index;
      displayTodoList();
      toggleSideBar();
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
        todoArrayFunctions.completeTodo(0, index);
      } else if (node.classList.contains('upcoming')) {
        todoArrayFunctions.completeTodo(1, index);
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoArrayFunctions.todoListArray.length; i++) {
          if (todoArrayFunctions.todoListArray[i][0] == project) {
            todoArrayFunctions.completeTodo(i, index)
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
      const node = e.target.parentElement.parentElement;
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
      console.log(todoArrayFunctions.todoListArray);
    }
  }

  function toggleSideBar() {
    sideBar.classList.toggle('side-bar-hide');
  }

  let todoToEdit;

  function toggleEditTodoForm(e) {
    if (e.target.classList.contains('fa-pen-to-square')) {
      toggleTodoForm('Edit Todo');
      const node = e.target.parentElement.parentElement.parentElement;
      node.style.display = 'none';
      const index = node.dataset.index;
      if (node.classList.contains('today')) {
        todoToEdit = todoArrayFunctions.findTodo(0, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
      } else if (node.classList.contains('upcoming')) {
        todoToEdit = todoArrayFunctions.findTodo(1, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
      } else {
        const project = node.classList[0];
        for (let i = 2; i < todoArrayFunctions.todoListArray.length; i++) {
          if (todoArrayFunctions.todoListArray[i][0] == project) {
            todoToEdit = todoArrayFunctions.findTodo(i, index);
            todoTitleInput.value = todoToEdit.title;
            todoDescriptionInput.value = todoToEdit.description;
            todoDueDateInput.value = todoToEdit.dueDate;
            todoPriorityInput.value = todoToEdit.priority;
          }
        }
      }
    }
    console.log(todoToEdit);
  }

  function clickEditTodo(todoToEdit) {
    console.log(todoToEdit);
  }


  const burgerMenu = document.querySelectorAll('.burger-menu');

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
      todoArrayFunctions.addProject(addProjectsInput.value);
      displayProject(addProjectsInput.value);
      toggleProjectForm();
    });
    sideBar.addEventListener('click', (e) => switchTodoListType(e));
    document.addEventListener('click', checkCompleteTodo);
    document.addEventListener('click', clickRemoveTodo);
    document.addEventListener('click', toggleEditTodoForm);
    burgerMenu.forEach(menu => menu.addEventListener('click', toggleSideBar));
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
// import dateFormat from "dateformat";




const ui = (0,_UIFunctions__WEBPACK_IMPORTED_MODULE_1__.UIFunctions)();
const todoArrayFunctions = (0,_TodoArrayFunctions__WEBPACK_IMPORTED_MODULE_0__.TodoArrayFunctions)();

ui.eventListeners();
ui.displayTodoList();
todoArrayFunctions.todoListCounter();





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW1ELGdCQUFnQixnREFBZ0QsZ0JBQWdCLGtGQUFrRixnQkFBZ0IscUdBQXFHLGdCQUFnQix3RUFBd0UsZ0JBQWdCLFlBQVksa0JBQWtCLGlCQUFpQixnQkFBZ0IsY0FBYywwQ0FBMEMsbUJBQW1CLHNCQUFzQixxQ0FBcUMsRUFBUyxXQUFXLG9aQUEyWixVQUFVLGdYQUFnWCwwQkFBMEIsb0VBQW9FLHNDQUFzQyx5Q0FBeUMsa0lBQWtJLG1CQUFtQix1QkFBdUIsMkNBQTJDLHNCQUFzQix5Q0FBeUMsK0JBQStCLDBCQUEwQiwrQkFBK0IsMkJBQTJCLCtCQUErQiw4QkFBOEIsdUNBQXVDLDhCQUE4Qix1Q0FBdUMsK0JBQStCLHVDQUF1QyxrQ0FBa0MscUNBQXFDLDZCQUE2QixxQ0FBcUMsOEJBQThCLHFDQUFxQyxpQ0FBaUMsZ0RBQWdELDRCQUE0QixpRUFBaUUsZ0NBQWdDLDhEQUE4RCwrQkFBK0IsZ0JBQWdCLG1DQUFtQywrRUFBK0UsaUZBQWlGLDZEQUE2RCw4RUFBOEUsNEVBQTRFLHNEQUFzRCxzREFBc0QsK0JBQStCLDZDQUE2QyxzQkFBc0IsWUFBWSxNQUFNLFlBQW1CLGlEQUFpRDs7Ozs7O1VDQXgyTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzBEO0FBQ2Q7OztBQUc1QyxXQUFXLHlEQUFXO0FBQ3RCLDJCQUEyQix1RUFBa0I7O0FBRTdDO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvQXJyYXlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tIFwiZGF0ZWZvcm1hdFwiO1xuaW1wb3J0IHsgVUlGdW5jdGlvbnMgfSBmcm9tIFwiLi9VSUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB1aSA9IFVJRnVuY3Rpb25zKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2RvQXJyYXlGdW5jdGlvbnMoKSB7XG5cbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgdG9kYXkgPSBkYXRlRm9ybWF0KG5vdywgJ3l5eXktbW0tZGQnKTtcbiAgY29uc3QgbmV4dERheSA9IG5ldyBEYXRlKG5vdyk7XG4gIG5leHREYXkuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpICsgMSk7XG4gIGNvbnN0IHRvbW9ycm93ID0gZGF0ZUZvcm1hdChuZXh0RGF5LCAneXl5eS1tbS1kZCcpO1xuXG4gIGNvbnN0IHRvZG9MaXN0QXJyYXlUb2RheSA9IFt7IHRpdGxlOiBcIlRhc2sgZm9yIHRvZGF5XCIsIGRlc2NyaXB0aW9uOiBcInNvbWV0aGluZyBoZXJlXCIsIHByaW9yaXR5OiBcIm1lZGl1bVwiLCBkdWVEYXRlOiB0b2RheSwgcHJvamVjdDogJ0luYm94JywgY29tcGxldGVkOiBmYWxzZSB9LFxuICBdO1xuICBjb25zdCB0b2RvTGlzdEFycmF5VXBjb21pbmcgPSBbeyB0aXRsZTogXCJUYXNrIGZvciB0b21vcnJvd1wiLCBkZXNjcmlwdGlvbjogXCJzb21ldGhpbmcgaGVyZVwiLCBwcmlvcml0eTogXCJtZWRpdW1cIiwgZHVlRGF0ZTogdG9tb3Jyb3csIHByb2plY3Q6ICdJbmJveCcsIGNvbXBsZXRlZDogZmFsc2UgfSxcbiAgeyB0aXRsZTogXCJUYXNrIGZvciBuZXh0IHdlZWtcIiwgZGVzY3JpcHRpb246IFwic29tZXRoaW5nIGhlcmVcIiwgcHJpb3JpdHk6IFwibWVkaXVtXCIsIGR1ZURhdGU6IFwiMjAyMy0wOC0yOFwiLCBwcm9qZWN0OiAnSW5ib3gnLCBjb21wbGV0ZWQ6IGZhbHNlIH1dO1xuXG4gIGNvbnN0IHRvZG9MaXN0Q29tcGxldGVkID0gW107XG5cbiAgY29uc3QgcHJvamVjdCA9IFsnUHJvamVjdCcsIHsgdGl0bGU6ICdTdHVkeSBXZWIgRGV2ZWxvcG1lbnQnLCBkZXNjcmlwdGlvbjogJycsIGR1ZURhdGU6ICcyMDIzLTA4LTI1JywgcHJpb3JpdHk6ICcnLCBwcm9qZWN0OiAnUHJvamVjdCcsIGNvbXBsZXRlZDogZmFsc2UgfV07XG5cbiAgY29uc3QgdG9kb0xpc3RBcnJheSA9IFt0b2RvTGlzdEFycmF5VG9kYXksIHRvZG9MaXN0QXJyYXlVcGNvbWluZywgdG9kb0xpc3RDb21wbGV0ZWQsIHByb2plY3RdO1xuXG4gIGNvbnN0IENyZWF0ZVRvZG8gPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY29tcGxldGVkKSB7XG4gICAgY29uc3QgdG9kbyA9IHt9O1xuICAgIHRvZG8udGl0bGUgPSB0aXRsZTtcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdG9kby5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0b2RvLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB0b2RvLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRvZG8uY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIHJldHVybiB0b2RvO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgY29uc3QgbmV3VG9kbyA9IENyZWF0ZVRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgZmFsc2UpO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgPT0gdG9kYXkgJiYgbmV3VG9kby5wcm9qZWN0ID09ICdJbmJveCcpIHRvZG9MaXN0QXJyYXlUb2RheS5wdXNoKG5ld1RvZG8pO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgIT09IHRvZGF5ICYmIG5ld1RvZG8ucHJvamVjdCA9PSAnSW5ib3gnKSB0b2RvTGlzdEFycmF5VXBjb21pbmcucHVzaChuZXdUb2RvKTtcbiAgICBpZiAobmV3VG9kby5kdWVEYXRlICE9PSB0b2RheSAmJiBuZXdUb2RvLnByb2plY3QgIT09ICdJbmJveCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgdG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodG9kb0xpc3RBcnJheVtpXVswXSA9PSBuZXdUb2RvLnByb2plY3QpIHtcbiAgICAgICAgICB0b2RvTGlzdEFycmF5W2ldLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KHZhbHVlKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IFt2YWx1ZV07XG4gICAgdG9kb0xpc3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0QXJyYXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9kb0xpc3RDb3VudGVyKCkge1xuICAgIGxldCBpbmJveENvdW50ZXIgPSAwO1xuICAgIGxldCB0b2RheUNvdW50ZXIgPSAwO1xuICAgIGxldCB1cGNvbWluZ0NvdW50ZXIgPSAwO1xuICAgIGxldCBjb21wbGV0ZWRDb3VudGVyID0gMDtcblxuICAgIHRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JyAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgeyBpbmJveENvdW50ZXIrKyB9XG4gICAgfSkpO1xuICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKCdJbmJveCcsIGluYm94Q291bnRlcik7XG5cbiAgICB0b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uZHVlRGF0ZSA9PSB0b2RheSAmJiB0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSB0b2RheUNvdW50ZXIrK1xuICAgIH0pKTtcbiAgICB1aS5kaXNwbGF5TnVtYmVyT2ZUb2RvcygnVG9kYXknLCB0b2RheUNvdW50ZXIpO1xuXG4gICAgdG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmR1ZURhdGUgIT09IHRvZGF5ICYmIHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIHVwY29taW5nQ291bnRlcisrXG4gICAgfSkpO1xuICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKCdVcGNvbWluZycsIHVwY29taW5nQ291bnRlcik7XG5cbiAgICB0b2RvTGlzdENvbXBsZXRlZC5mb3JFYWNoKCgpID0+IGNvbXBsZXRlZENvdW50ZXIrKyk7XG4gICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MoJ0NvbXBsZXRlZCcsIGNvbXBsZXRlZENvdW50ZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDM7IGkgPCB0b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICB0b2RvTGlzdEFycmF5W2ldLmZvckVhY2goaXRlbSA9PiB7IGlmICh0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnKSB7IGNvdW50ZXIrKyB9IH0pO1xuICAgICAgbGV0IHByb2plY3QgPSB0b2RvTGlzdEFycmF5W2ldWzBdO1xuICAgICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MocHJvamVjdCwgY291bnRlcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVG9kbyhhcnJheSwgaW5kZXgpIHtcbiAgICB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGxldGVUb2RvKGFycmF5LCBpbmRleCkge1xuICAgIHRvZG9MaXN0QXJyYXlbYXJyYXldW2luZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRvZG8gPSB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRvZG9MaXN0Q29tcGxldGVkLnB1c2goY29tcGxldGVkVG9kb1swXSk7XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kVG9kbyhhcnJheSwgaW5kZXgpIHtcbiAgICByZXR1cm4gdG9kb0xpc3RBcnJheVthcnJheV1baW5kZXhdO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUb2RvLFxuICAgIGFkZFByb2plY3QsXG4gICAgdG9kb0xpc3RDb3VudGVyLFxuICAgIHJlbW92ZVRvZG8sXG4gICAgY29tcGxldGVUb2RvLFxuICAgIGZpbmRUb2RvLFxuICAgIHRvZG9MaXN0QXJyYXksXG4gICAgdG9kb0xpc3RDb21wbGV0ZWQsXG4gICAgdG9kYXksXG4gICAgdG9tb3Jyb3csXG4gICAgbmV4dERheSxcbiAgICBub3dcbiAgfVxufSIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5pbXBvcnQgeyBUb2RvQXJyYXlGdW5jdGlvbnMgfSBmcm9tIFwiLi9Ub2RvQXJyYXlGdW5jdGlvbnNcIjtcblxuY29uc3QgdG9kb0FycmF5RnVuY3Rpb25zID0gVG9kb0FycmF5RnVuY3Rpb25zKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBVSUZ1bmN0aW9ucygpIHtcblxuICBsZXQgY3VycmVudFBhZ2UgPSAnSW5ib3gnO1xuXG4gIGNvbnN0IGFkZFRvZG9Gb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10b2RvLWNvbnRhaW5lcicpO1xuICBjb25zdCBjYW5jZWxUb2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwtZm9ybScpO1xuICBjb25zdCBhZGRUb2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG9kby1mb3JtJyk7XG5cbiAgY29uc3QgdG9nZ2xlVG9kb0Zvcm0gPSAodGV4dCkgPT4ge1xuICAgIGFkZFRvZG9Gb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgICBhZGRUb2RvRm9ybUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgY29uc3QgYWRkVG9kb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdG9kby1idXR0b24nKTtcbiAgICBhZGRUb2RvQnV0dG9uLnRleHRDb250ZW50ID0gYCR7dGV4dH1gXG4gICAgY2xlYXJUb2RvRm9ybSgpO1xuICB9XG5cbiAgY29uc3QgYWRkUHJvamVjdHNGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0cy1jb250YWluZXInKTtcbiAgY29uc3QgY2FuY2VsUHJvamVjdHNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLXByb2plY3QtZm9ybS1idXR0b24nKTtcbiAgY29uc3QgYWRkUHJvamVjdHNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0cy1mb3JtJyk7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlUHJvamVjdEZvcm0oKSB7XG4gICAgYWRkUHJvamVjdHNGb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgICBhZGRQcm9qZWN0c0Zvcm1CdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgIGNsZWFyUHJvamVjdHNGb3JtKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5UHJvamVjdCh0aXRsZSkge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi52YWx1ZSA9IHRpdGxlO1xuICAgIG9wdGlvbi5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMnKTtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHAuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29uc3QgcHJvamVjdFRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1kaWFncmFtLXByb2plY3QnKTtcbiAgICBwLmlubmVySFRNTCA9IGAke3RpdGxlfSAtIDxzcGFuIGRhdGEtaW5kZXg9XCIke3RpdGxlfVwiPjwvc3Bhbj5gO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCduYXYtaXRlbScpXG4gICAgZGl2LmFwcGVuZENoaWxkKHByb2plY3RUcmFzaEljb24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHAuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdGl0bGUpO1xuICAgIHByb2plY3RUcmFzaEljb24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdGl0bGUpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB0aXRsZSk7XG4gIH1cblxuICBjb25zdCBhZGRQcm9qZWN0c0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0cy1pbnB1dCcpO1xuICBjb25zdCB0b2RvVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRpdGxlLWlucHV0Jyk7XG4gIGNvbnN0IHRvZG9EZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGVzY3JpcHRpb24taW5wdXQnKTtcbiAgY29uc3QgdG9kb0R1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWR1ZS1kYXRlLWlucHV0Jyk7XG4gIGNvbnN0IHRvZG9Qcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tcHJpb3JpdHktaW5wdXQnKTtcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpO1xuICBjb25zdCBhZGRQcm9qZWN0c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdHMtYnV0dG9uJyk7XG4gIGNvbnN0IGFkZFRvZG9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8tYnV0dG9uJyk7XG5cbiAgZnVuY3Rpb24gY2xlYXJQcm9qZWN0c0Zvcm0oKSB7XG4gICAgYWRkUHJvamVjdHNJbnB1dC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJUb2RvRm9ybSgpIHtcbiAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gJyc7XG4gICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlID0gJyc7XG4gIH1cblxuICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcblxuICBmdW5jdGlvbiBkaXNwbGF5VG9kb0xpc3QoKSB7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdJbmJveCcpIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHsgaWYgKHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIGRpc3BsYXlUb2RvKGl0ZW0sIGluZGV4KSB9KSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PSAnVG9kYXknKSB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7IGlmIChpdGVtLmR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleCkgfSkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT0gJ1VwY29taW5nJykge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4geyBpZiAoaXRlbS5kdWVEYXRlICE9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9kYXkgJiYgdHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JyAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgZGlzcGxheVRvZG8oaXRlbSwgaW5kZXgpIH0pKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09ICdDb21wbGV0ZWQnKSB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb21wbGV0ZWQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IGRpc3BsYXlUb2RvKGl0ZW0sIGluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHsgaWYgKGl0ZW0ucHJvamVjdCA9PSBjdXJyZW50UGFnZSAmJiB0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleCkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlUb2RvKHRvZG8sIGluZGV4KSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcblxuICAgIGlmICh0b2RvLmR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIHRvZG8ucHJvamVjdCA9PSAnSW5ib3gnKSBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcbiAgICBpZiAodG9kby5kdWVEYXRlICE9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9kYXkgJiYgdG9kby5wcm9qZWN0ID09ICdJbmJveCcpIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd1cGNvbWluZycpO1xuICAgIGlmICh0b2RvLmR1ZURhdGUgIT09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSAmJiB0b2RvLnByb2plY3QgIT09ICdJbmJveCcpIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRvZG8ucHJvamVjdCk7XG5cbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby10aXRsZScpO1xuICAgIGNvbnN0IHRvZG9UaXRsZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgIHRvZG9UaXRsZVRleHQudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuICAgIGNvbnN0IHRvZG9DaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdG9kb0NoZWNrQm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgIHRvZG9DaGVja0JveC5jbGFzc0xpc3QuYWRkKCdjaGVjay1ib3gnKTtcbiAgICBjb25zdCB0b2RvVGl0bGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb1RpdGxlV3JhcHBlci5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IGZsZXg7IGdhcDogMXJlbTsgYWxpZ24taXRlbXM6IGNlbnRlcjsnO1xuICAgIHRvZG9UaXRsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0NoZWNrQm94KTtcbiAgICB0b2RvVGl0bGVXcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9UaXRsZVRleHQpO1xuICAgIHRvZG9UaXRsZS5hcHBlbmRDaGlsZCh0b2RvVGl0bGVXcmFwcGVyKTtcbiAgICBjb25zdCB0b2RvVGl0bGVJY29uV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9UaXRsZUljb25XcmFwcGVyLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogZmxleDsgZ2FwOiAycmVtOydcbiAgICBjb25zdCB0b2RvRWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgdG9kb0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gICAgdG9kb0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXBlbi10by1zcXVhcmUnKTtcbiAgICBjb25zdCB0b2RvVHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHRvZG9UcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcbiAgICB0b2RvVHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXRyYXNoJyk7XG4gICAgdG9kb1RpdGxlSWNvbldyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb0VkaXRJY29uKTtcbiAgICB0b2RvVGl0bGVJY29uV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvVHJhc2hJY29uKTtcbiAgICB0b2RvVGl0bGUuYXBwZW5kQ2hpbGQodG9kb1RpdGxlSWNvbldyYXBwZXIpO1xuXG4gICAgY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b2RvUHJpb3JpdHkuc3R5bGUuY3NzVGV4dCA9ICdib3JkZXItcmFkaXVzOiA2cHg7IGZvbnQtc2l6ZTogMC43cmVtOyBwYWRkaW5nOjAuMnJlbSAwLjRyZW07IGRpc3BsYXk6IGdyaWQ7IHBsYWNlLWl0ZW1zOiBjZW50ZXI7IGZvbnQtd2VpZ2h0OiA2MDA7JztcblxuICAgIGlmICh0b2RvLnByaW9yaXR5ID09ICdsb3cnIHx8IHRvZG8ucHJpb3JpdHkgPT0gJycpIHtcbiAgICAgIHRvZG9Qcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICAgICAgdG9kb1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0xvdyBQcmlvcml0eSc7XG4gICAgfSBlbHNlIGlmICh0b2RvLnByaW9yaXR5ID09ICdtZWRpdW0nKSB7XG4gICAgICB0b2RvUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnTWVkaXVtIFByaW9yaXR5JztcbiAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICB0b2RvUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnSGlnaCBQcmlvcml0eSc7XG4gICAgfVxuICAgIGNvbnN0IHByaW9yaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJpb3JpdHlDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwYWRkaW5nOiAwLjRyZW07IGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yMyk7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGRpc3BsYXk6IGdyaWQ7IHBsYWNlLWl0ZW1zOiBjZW50ZXI7J1xuICAgIHByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9Qcmlvcml0eSk7XG5cbiAgICBjb25zdCB0b2RvRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0b2RvRHVlRGF0ZS50ZXh0Q29udGVudCA9IGNhbGN1bGF0ZVJlbWFpbmluZ0RheXModG9kby5kdWVEYXRlKTtcbiAgICB0b2RvRHVlRGF0ZS5zdHlsZS5jc3NUZXh0ID0gJ21hcmdpbjogMDsnXG5cbiAgICBjb25zdCBkdWVEYXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZHVlRGF0ZUNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZTogMC45cmVtOyBwYWRkaW5nOiAwLjVyZW07IGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yMyk7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGRpc3BsYXk6IGdyaWQ7IHBsYWNlLWl0ZW1zOiBjZW50ZXI7J1xuICAgIGR1ZURhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0R1ZURhdGUpO1xuXG4gICAgY29uc3QgZmxleERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZsZXhEaXYuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDJyZW07J1xuICAgIGZsZXhEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlDb250YWluZXIpO1xuICAgIGZsZXhEaXYuYXBwZW5kQ2hpbGQoZHVlRGF0ZUNvbnRhaW5lcik7XG4gICAgaWYgKHRvZG8ucHJvamVjdCAhPT0gJ0luYm94Jykge1xuICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcHJvamVjdENvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZTogMC45cmVtOyBwYWRkaW5nOiAwLjVyZW07IGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yMyk7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGRpc3BsYXk6IGdyaWQ7IHBsYWNlLWl0ZW1zOiBjZW50ZXI7J1xuICAgICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSB0b2RvLnByb2plY3Q7XG4gICAgICBmbGV4RGl2LmFwcGVuZENoaWxkKHByb2plY3RDb250YWluZXIpO1xuICAgIH1cblxuICAgIGlmICh0b2RvLmNvbXBsZXRlZCA9PSB0cnVlKSB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbGluZS10aHJvdWdoJyk7XG4gICAgICB0b2RvVHJhc2hJY29uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0b2RvQ2hlY2tCb3guY2hlY2tlZCA9IHRydWU7XG4gICAgICB0b2RvQ2hlY2tCb3guZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRGVzY3JpcHRpb24pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmbGV4RGl2KTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xuICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxjdWxhdGVSZW1haW5pbmdEYXlzKGR1ZURhdGUpIHtcbiAgICBpZiAoZHVlRGF0ZSA9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9kYXkpIHtcbiAgICAgIHJldHVybiBgRHVlIHRvZGF5IWA7XG4gICAgfSBlbHNlIGlmIChkdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b21vcnJvdykge1xuICAgICAgcmV0dXJuIGBEdWUgdG9tb3Jyb3chYDtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMubmV4dERheS5zZXREYXRlKHRvZG9BcnJheUZ1bmN0aW9ucy5ub3cuZ2V0RGF0ZSgpICsgaSk7XG4gICAgICAgIGlmIChkdWVEYXRlID09IGRhdGVGb3JtYXQodG9kb0FycmF5RnVuY3Rpb25zLm5leHREYXksICd5eXl5LW1tLWRkJykpIHtcbiAgICAgICAgICByZXR1cm4gYER1ZSBpbiAke2l9IGRheXNgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtYmFyJyk7XG5cbiAgZnVuY3Rpb24gc3dpdGNoVG9kb0xpc3RUeXBlKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtaXRlbScpIHx8IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtaXRlbScpIHx8IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1pdGVtJykpIHtcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0cy1jb250YWluZXInKSB8fCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3RzLWNvbnRhaW5lcicpKSByZXR1cm47XG4gICAgICBjb25zdCB0b2RvTGlzdFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LXR5cGUnKTtcbiAgICAgIHRvZG9MaXN0VHlwZS5pbm5lckhUTUwgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgY3VycmVudFBhZ2UgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgICB0b2dnbGVTaWRlQmFyKCk7XG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50UGFnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tDb21wbGV0ZVRvZG8oZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NoZWNrLWJveCcpKSB7XG4gICAgICBjb25zdCBub2RlID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBpbmRleCA9IG5vZGUuZGF0YXNldC5pbmRleDtcbiAgICAgIGNvbnNvbGUubG9nKHsgbm9kZSwgaW5kZXggfSlcbiAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnbGluZS10aHJvdWdoJyk7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZGF5JykpIHtcbiAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmNvbXBsZXRlVG9kbygwLCBpbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd1cGNvbWluZycpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oMSwgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5vZGUuY2xhc3NMaXN0WzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5W2ldWzBdID09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oaSwgaW5kZXgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrUmVtb3ZlVG9kbyhlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmEtdHJhc2gnKSkge1xuICAgICAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGluZGV4ID0gbm9kZS5kYXRhc2V0LmluZGV4O1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2RheScpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5yZW1vdmVUb2RvKDAsIGluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3VwY29taW5nJykpIHtcbiAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnJlbW92ZVRvZG8oMSwgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5vZGUuY2xhc3NMaXN0WzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5W2ldWzBdID09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5yZW1vdmVUb2RvKGksIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuICAgICAgY29uc29sZS5sb2codG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0QXJyYXkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVNpZGVCYXIoKSB7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlLWJhci1oaWRlJyk7XG4gIH1cblxuICBsZXQgdG9kb1RvRWRpdDtcblxuICBmdW5jdGlvbiB0b2dnbGVFZGl0VG9kb0Zvcm0oZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLXBlbi10by1zcXVhcmUnKSkge1xuICAgICAgdG9nZ2xlVG9kb0Zvcm0oJ0VkaXQgVG9kbycpO1xuICAgICAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgY29uc3QgaW5kZXggPSBub2RlLmRhdGFzZXQuaW5kZXg7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZGF5JykpIHtcbiAgICAgICAgdG9kb1RvRWRpdCA9IHRvZG9BcnJheUZ1bmN0aW9ucy5maW5kVG9kbygwLCBpbmRleCk7XG4gICAgICAgIHRvZG9UaXRsZUlucHV0LnZhbHVlID0gdG9kb1RvRWRpdC50aXRsZTtcbiAgICAgICAgdG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LmRlc2NyaXB0aW9uO1xuICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5kdWVEYXRlO1xuICAgICAgICB0b2RvUHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQucHJpb3JpdHk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd1cGNvbWluZycpKSB7XG4gICAgICAgIHRvZG9Ub0VkaXQgPSB0b2RvQXJyYXlGdW5jdGlvbnMuZmluZFRvZG8oMSwgaW5kZXgpO1xuICAgICAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQudGl0bGU7XG4gICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnByaW9yaXR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5vZGUuY2xhc3NMaXN0WzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5W2ldWzBdID09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHRvZG9Ub0VkaXQgPSB0b2RvQXJyYXlGdW5jdGlvbnMuZmluZFRvZG8oaSwgaW5kZXgpO1xuICAgICAgICAgICAgdG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnRpdGxlO1xuICAgICAgICAgICAgdG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5wcmlvcml0eTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2codG9kb1RvRWRpdCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGlja0VkaXRUb2RvKHRvZG9Ub0VkaXQpIHtcbiAgICBjb25zb2xlLmxvZyh0b2RvVG9FZGl0KTtcbiAgfVxuXG5cbiAgY29uc3QgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXJnZXItbWVudScpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGFkZFRvZG9Gb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlVG9kb0Zvcm0oJ0FkZCBUb2RvJykpO1xuICAgIGNhbmNlbFRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVG9kb0Zvcm0pO1xuICAgIGFkZFByb2plY3RzRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVByb2plY3RGb3JtKTtcbiAgICBjYW5jZWxQcm9qZWN0c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVByb2plY3RGb3JtKTtcbiAgICBhZGRUb2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKGFkZFRvZG9CdXR0b24udGV4dENvbnRlbnQgPT0gJ0FkZCBUb2RvJykge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuYWRkVG9kbyh0b2RvVGl0bGVJbnB1dC52YWx1ZSxcbiAgICAgICAgICB0b2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcbiAgICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnZhbHVlLFxuICAgICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlLFxuICAgICAgICAgIHByb2plY3RTZWxlY3QudmFsdWUpO1xuICAgICAgICB0b2dnbGVUb2RvRm9ybSgpO1xuICAgICAgICBkaXNwbGF5VG9kb0xpc3QoKTtcbiAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xpY2tFZGl0VG9kbygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGFkZFByb2plY3RzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmFkZFByb2plY3QoYWRkUHJvamVjdHNJbnB1dC52YWx1ZSk7XG4gICAgICBkaXNwbGF5UHJvamVjdChhZGRQcm9qZWN0c0lucHV0LnZhbHVlKTtcbiAgICAgIHRvZ2dsZVByb2plY3RGb3JtKCk7XG4gICAgfSk7XG4gICAgc2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBzd2l0Y2hUb2RvTGlzdFR5cGUoZSkpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZVRvZG8pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tSZW1vdmVUb2RvKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUVkaXRUb2RvRm9ybSk7XG4gICAgYnVyZ2VyTWVudS5mb3JFYWNoKG1lbnUgPT4gbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVNpZGVCYXIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlOdW1iZXJPZlRvZG9zKGxpc3RUeXBlLCBjb3VudGVyKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3BhbltkYXRhLWluZGV4PVwiJHtsaXN0VHlwZX1cIl1gKS50ZXh0Q29udGVudCA9IGNvdW50ZXI7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV2ZW50TGlzdGVuZXJzLFxuICAgIGRpc3BsYXlUb2RvTGlzdCxcbiAgICBkaXNwbGF5TnVtYmVyT2ZUb2Rvc1xuICB9XG59IiwidmFyIHRva2VuPS9kezEsNH18RHszLDR9fG17MSw0fXx5eSg/Onl5KT98KFtIaE1zVHRdKVxcMT98V3sxLDJ9fFtMbG9wU1pOXXxcIlteXCJdKlwifCdbXiddKicvZzt2YXIgdGltZXpvbmU9L1xcYig/OltBLVpdezEsM31bQS1aXVtUQ10pKD86Wy0rXVxcZHs0fSk/fCgoPzpBdXN0cmFsaWFuICk/KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWUpXFxiL2c7dmFyIHRpbWV6b25lQ2xpcD0vW14tK1xcZEEtWl0vZztleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRlRm9ybWF0KGRhdGUsbWFzayx1dGMsZ210KXtpZihhcmd1bWVudHMubGVuZ3RoPT09MSYmdHlwZW9mIGRhdGU9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKG1hc2tzW21hc2tdfHxtYXNrfHxtYXNrc1tcImRlZmF1bHRcIl0pO3ZhciBtYXNrU2xpY2U9bWFzay5zbGljZSgwLDQpO2lmKG1hc2tTbGljZT09PVwiVVRDOlwifHxtYXNrU2xpY2U9PT1cIkdNVDpcIil7bWFzaz1tYXNrLnNsaWNlKDQpO3V0Yz10cnVlO2lmKG1hc2tTbGljZT09PVwiR01UOlwiKXtnbXQ9dHJ1ZX19dmFyIF89ZnVuY3Rpb24gXygpe3JldHVybiB1dGM/XCJnZXRVVENcIjpcImdldFwifTt2YXIgX2Q9ZnVuY3Rpb24gZCgpe3JldHVybiBkYXRlW18oKStcIkRhdGVcIl0oKX07dmFyIEQ9ZnVuY3Rpb24gRCgpe3JldHVybiBkYXRlW18oKStcIkRheVwiXSgpfTt2YXIgX209ZnVuY3Rpb24gbSgpe3JldHVybiBkYXRlW18oKStcIk1vbnRoXCJdKCl9O3ZhciB5PWZ1bmN0aW9uIHkoKXtyZXR1cm4gZGF0ZVtfKCkrXCJGdWxsWWVhclwiXSgpfTt2YXIgX0g9ZnVuY3Rpb24gSCgpe3JldHVybiBkYXRlW18oKStcIkhvdXJzXCJdKCl9O3ZhciBfTT1mdW5jdGlvbiBNKCl7cmV0dXJuIGRhdGVbXygpK1wiTWludXRlc1wiXSgpfTt2YXIgX3M9ZnVuY3Rpb24gcygpe3JldHVybiBkYXRlW18oKStcIlNlY29uZHNcIl0oKX07dmFyIF9MPWZ1bmN0aW9uIEwoKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaWxsaXNlY29uZHNcIl0oKX07dmFyIF9vPWZ1bmN0aW9uIG8oKXtyZXR1cm4gdXRjPzA6ZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpfTt2YXIgX1c9ZnVuY3Rpb24gVygpe3JldHVybiBnZXRXZWVrKGRhdGUpfTt2YXIgX049ZnVuY3Rpb24gTigpe3JldHVybiBnZXREYXlPZldlZWsoZGF0ZSl9O3ZhciBmbGFncz17ZDpmdW5jdGlvbiBkKCl7cmV0dXJuIF9kKCl9LGRkOmZ1bmN0aW9uIGRkKCl7cmV0dXJuIHBhZChfZCgpKX0sZGRkOmZ1bmN0aW9uIGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpXSxzaG9ydDp0cnVlfSl9LGRkZGQ6ZnVuY3Rpb24gZGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKSs3XX0sRERERDpmdW5jdGlvbiBEREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKV19LG1tbW06ZnVuY3Rpb24gbW1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKSsxMl19LHl5OmZ1bmN0aW9uIHl5KCl7cmV0dXJuIFN0cmluZyh5KCkpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uIHl5eXkoKXtyZXR1cm4gcGFkKHkoKSw0KX0saDpmdW5jdGlvbiBoKCl7cmV0dXJuIF9IKCklMTJ8fDEyfSxoaDpmdW5jdGlvbiBoaCgpe3JldHVybiBwYWQoX0goKSUxMnx8MTIpfSxIOmZ1bmN0aW9uIEgoKXtyZXR1cm4gX0goKX0sSEg6ZnVuY3Rpb24gSEgoKXtyZXR1cm4gcGFkKF9IKCkpfSxNOmZ1bmN0aW9uIE0oKXtyZXR1cm4gX00oKX0sTU06ZnVuY3Rpb24gTU0oKXtyZXR1cm4gcGFkKF9NKCkpfSxzOmZ1bmN0aW9uIHMoKXtyZXR1cm4gX3MoKX0sc3M6ZnVuY3Rpb24gc3MoKXtyZXR1cm4gcGFkKF9zKCkpfSxsOmZ1bmN0aW9uIGwoKXtyZXR1cm4gcGFkKF9MKCksMyl9LEw6ZnVuY3Rpb24gTCgpe3JldHVybiBwYWQoTWF0aC5mbG9vcihfTCgpLzEwKSl9LHQ6ZnVuY3Rpb24gdCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzBdOmkxOG4udGltZU5hbWVzWzFdfSx0dDpmdW5jdGlvbiB0dCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzJdOmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s0XTppMThuLnRpbWVOYW1lc1s1XX0sVFQ6ZnVuY3Rpb24gVFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s2XTppMThuLnRpbWVOYW1lc1s3XX0sWjpmdW5jdGlvbiBaKCl7cmV0dXJuIGdtdD9cIkdNVFwiOnV0Yz9cIlVUQ1wiOmZvcm1hdFRpbWV6b25lKGRhdGUpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9ZXhwb3J0IHZhciBtYXNrcz17ZGVmYXVsdDpcImRkZCBtbW0gZGQgeXl5eSBISDpNTTpzc1wiLHNob3J0RGF0ZTpcIm0vZC95eVwiLHBhZGRlZFNob3J0RGF0ZTpcIm1tL2RkL3l5eXlcIixtZWRpdW1EYXRlOlwibW1tIGQsIHl5eXlcIixsb25nRGF0ZTpcIm1tbW0gZCwgeXl5eVwiLGZ1bGxEYXRlOlwiZGRkZCwgbW1tbSBkLCB5eXl5XCIsc2hvcnRUaW1lOlwiaDpNTSBUVFwiLG1lZGl1bVRpbWU6XCJoOk1NOnNzIFRUXCIsbG9uZ1RpbWU6XCJoOk1NOnNzIFRUIFpcIixpc29EYXRlOlwieXl5eS1tbS1kZFwiLGlzb1RpbWU6XCJISDpNTTpzc1wiLGlzb0RhdGVUaW1lOlwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzb1wiLGlzb1V0Y0RhdGVUaW1lOlwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiLGV4cGlyZXNIZWFkZXJGb3JtYXQ6XCJkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFpcIn07ZXhwb3J0IHZhciBpMThuPXtkYXlOYW1lczpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIixcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLG1vbnRoTmFtZXM6W1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiLFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLHRpbWVOYW1lczpbXCJhXCIsXCJwXCIsXCJhbVwiLFwicG1cIixcIkFcIixcIlBcIixcIkFNXCIsXCJQTVwiXX07dmFyIHBhZD1mdW5jdGlvbiBwYWQodmFsKXt2YXIgbGVuPWFyZ3VtZW50cy5sZW5ndGg+MSYmYXJndW1lbnRzWzFdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1sxXToyO3JldHVybiBTdHJpbmcodmFsKS5wYWRTdGFydChsZW4sXCIwXCIpfTt2YXIgZ2V0RGF5TmFtZT1mdW5jdGlvbiBnZXREYXlOYW1lKF9yZWYpe3ZhciB5PV9yZWYueSxtPV9yZWYubSxkPV9yZWYuZCxfPV9yZWYuXyxkYXlOYW1lPV9yZWYuZGF5TmFtZSxfcmVmJHNob3J0PV9yZWZbXCJzaG9ydFwiXSxfc2hvcnQ9X3JlZiRzaG9ydD09PXZvaWQgMD9mYWxzZTpfcmVmJHNob3J0O3ZhciB0b2RheT1uZXcgRGF0ZTt2YXIgeWVzdGVyZGF5PW5ldyBEYXRlO3llc3RlcmRheS5zZXREYXRlKHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpLTEpO3ZhciB0b21vcnJvdz1uZXcgRGF0ZTt0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93W18rXCJEYXRlXCJdKCkrMSk7dmFyIHRvZGF5X2Q9ZnVuY3Rpb24gdG9kYXlfZCgpe3JldHVybiB0b2RheVtfK1wiRGF0ZVwiXSgpfTt2YXIgdG9kYXlfbT1mdW5jdGlvbiB0b2RheV9tKCl7cmV0dXJuIHRvZGF5W18rXCJNb250aFwiXSgpfTt2YXIgdG9kYXlfeT1mdW5jdGlvbiB0b2RheV95KCl7cmV0dXJuIHRvZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgeWVzdGVyZGF5X2Q9ZnVuY3Rpb24geWVzdGVyZGF5X2QoKXtyZXR1cm4geWVzdGVyZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfbT1mdW5jdGlvbiB5ZXN0ZXJkYXlfbSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfeT1mdW5jdGlvbiB5ZXN0ZXJkYXlfeSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB0b21vcnJvd19kPWZ1bmN0aW9uIHRvbW9ycm93X2QoKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkRhdGVcIl0oKX07dmFyIHRvbW9ycm93X209ZnVuY3Rpb24gdG9tb3Jyb3dfbSgpe3JldHVybiB0b21vcnJvd1tfK1wiTW9udGhcIl0oKX07dmFyIHRvbW9ycm93X3k9ZnVuY3Rpb24gdG9tb3Jyb3dfeSgpe3JldHVybiB0b21vcnJvd1tfK1wiRnVsbFllYXJcIl0oKX07aWYodG9kYXlfeSgpPT09eSYmdG9kYXlfbSgpPT09bSYmdG9kYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRkeVwiOlwiVG9kYXlcIn1lbHNlIGlmKHllc3RlcmRheV95KCk9PT15JiZ5ZXN0ZXJkYXlfbSgpPT09bSYmeWVzdGVyZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJZc2RcIjpcIlllc3RlcmRheVwifWVsc2UgaWYodG9tb3Jyb3dfeSgpPT09eSYmdG9tb3Jyb3dfbSgpPT09bSYmdG9tb3Jyb3dfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRtd1wiOlwiVG9tb3Jyb3dcIn1yZXR1cm4gZGF5TmFtZX07dmFyIGdldFdlZWs9ZnVuY3Rpb24gZ2V0V2VlayhkYXRlKXt2YXIgdGFyZ2V0VGh1cnNkYXk9bmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSxkYXRlLmdldERhdGUoKSk7dGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCktKHRhcmdldFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGZpcnN0VGh1cnNkYXk9bmV3IERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RnVsbFllYXIoKSwwLDQpO2ZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKS0oZmlyc3RUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBkcz10YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpLWZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTt0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpLWRzKTt2YXIgd2Vla0RpZmY9KHRhcmdldFRodXJzZGF5LWZpcnN0VGh1cnNkYXkpLyg4NjRlNSo3KTtyZXR1cm4gMStNYXRoLmZsb29yKHdlZWtEaWZmKX07dmFyIGdldERheU9mV2Vlaz1mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSl7dmFyIGRvdz1kYXRlLmdldERheSgpO2lmKGRvdz09PTApe2Rvdz03fXJldHVybiBkb3d9O2V4cG9ydCB2YXIgZm9ybWF0VGltZXpvbmU9ZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUoZGF0ZSl7cmV0dXJuKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5pbXBvcnQgeyBUb2RvQXJyYXlGdW5jdGlvbnMgfSBmcm9tIFwiLi9Ub2RvQXJyYXlGdW5jdGlvbnNcIjtcbmltcG9ydCB7IFVJRnVuY3Rpb25zIH0gZnJvbSBcIi4vVUlGdW5jdGlvbnNcIjtcblxuXG5jb25zdCB1aSA9IFVJRnVuY3Rpb25zKCk7XG5jb25zdCB0b2RvQXJyYXlGdW5jdGlvbnMgPSBUb2RvQXJyYXlGdW5jdGlvbnMoKTtcblxudWkuZXZlbnRMaXN0ZW5lcnMoKTtcbnVpLmRpc3BsYXlUb2RvTGlzdCgpO1xudG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=