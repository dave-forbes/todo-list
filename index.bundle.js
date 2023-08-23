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

  return {
    addTodo,
    addProject,
    todoListCounter,
    removeTodo,
    completeTodo,
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

  const burgerMenu = document.querySelectorAll('.burger-menu');

  function eventListeners() {
    addTodoFormButton.addEventListener('click', toggleTodoForm);
    cancelTodoForm.addEventListener('click', toggleTodoForm);
    addProjectsFormButton.addEventListener('click', toggleProjectForm);
    cancelProjectsButton.addEventListener('click', toggleProjectForm);
    addTodoButton.addEventListener('click', () => {
      todoArrayFunctions.addTodo(todoTitleInput.value,
        todoDescriptionInput.value,
        todoDueDateInput.value,
        todoPriorityInput.value,
        projectSelect.value);
      toggleTodoForm();
      displayTodoList();
      todoArrayFunctions.todoListCounter();
    });
    addProjectsButton.addEventListener('click', () => {
      todoArrayFunctions.addProject(addProjectsInput.value);
      displayProject(addProjectsInput.value);
      toggleProjectForm();
    });
    sideBar.addEventListener('click', (e) => switchTodoListType(e));
    document.addEventListener('click', checkCompleteTodo);
    document.addEventListener('click', clickRemoveTodo);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFDQUFxQyxpQ0FBaUMsZ0RBQWdELDRCQUE0QixpRUFBaUUsZ0NBQWdDLDhEQUE4RCwrQkFBK0IsZ0JBQWdCLG1DQUFtQywrRUFBK0UsaUZBQWlGLDZEQUE2RCw4RUFBOEUsNEVBQTRFLHNEQUFzRCxzREFBc0QsK0JBQStCLDZDQUE2QyxzQkFBc0IsWUFBWSxNQUFNLFlBQW1CLGlEQUFpRDs7Ozs7O1VDQXgyTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzBEO0FBQ2Q7OztBQUc1QyxXQUFXLHlEQUFXO0FBQ3RCLDJCQUEyQix1RUFBa0I7O0FBRTdDO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvQXJyYXlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tIFwiZGF0ZWZvcm1hdFwiO1xuaW1wb3J0IHsgVUlGdW5jdGlvbnMgfSBmcm9tIFwiLi9VSUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB1aSA9IFVJRnVuY3Rpb25zKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2RvQXJyYXlGdW5jdGlvbnMoKSB7XG5cbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgdG9kYXkgPSBkYXRlRm9ybWF0KG5vdywgJ3l5eXktbW0tZGQnKTtcbiAgY29uc3QgbmV4dERheSA9IG5ldyBEYXRlKG5vdyk7XG4gIG5leHREYXkuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpICsgMSk7XG4gIGNvbnN0IHRvbW9ycm93ID0gZGF0ZUZvcm1hdChuZXh0RGF5LCAneXl5eS1tbS1kZCcpO1xuXG4gIGNvbnN0IHRvZG9MaXN0QXJyYXlUb2RheSA9IFt7IHRpdGxlOiBcIlRhc2sgZm9yIHRvZGF5XCIsIGRlc2NyaXB0aW9uOiBcInNvbWV0aGluZyBoZXJlXCIsIHByaW9yaXR5OiBcIm1lZGl1bVwiLCBkdWVEYXRlOiB0b2RheSwgcHJvamVjdDogJ0luYm94JywgY29tcGxldGVkOiBmYWxzZSB9LFxuICBdO1xuICBjb25zdCB0b2RvTGlzdEFycmF5VXBjb21pbmcgPSBbeyB0aXRsZTogXCJUYXNrIGZvciB0b21vcnJvd1wiLCBkZXNjcmlwdGlvbjogXCJzb21ldGhpbmcgaGVyZVwiLCBwcmlvcml0eTogXCJtZWRpdW1cIiwgZHVlRGF0ZTogdG9tb3Jyb3csIHByb2plY3Q6ICdJbmJveCcsIGNvbXBsZXRlZDogZmFsc2UgfSxcbiAgeyB0aXRsZTogXCJUYXNrIGZvciBuZXh0IHdlZWtcIiwgZGVzY3JpcHRpb246IFwic29tZXRoaW5nIGhlcmVcIiwgcHJpb3JpdHk6IFwibWVkaXVtXCIsIGR1ZURhdGU6IFwiMjAyMy0wOC0yOFwiLCBwcm9qZWN0OiAnSW5ib3gnLCBjb21wbGV0ZWQ6IGZhbHNlIH1dO1xuXG4gIGNvbnN0IHRvZG9MaXN0Q29tcGxldGVkID0gW107XG5cbiAgY29uc3QgcHJvamVjdCA9IFsnUHJvamVjdCcsIHsgdGl0bGU6ICdTdHVkeSBXZWIgRGV2ZWxvcG1lbnQnLCBkZXNjcmlwdGlvbjogJycsIGR1ZURhdGU6ICcyMDIzLTA4LTI1JywgcHJpb3JpdHk6ICcnLCBwcm9qZWN0OiAnUHJvamVjdCcsIGNvbXBsZXRlZDogZmFsc2UgfV07XG5cbiAgY29uc3QgdG9kb0xpc3RBcnJheSA9IFt0b2RvTGlzdEFycmF5VG9kYXksIHRvZG9MaXN0QXJyYXlVcGNvbWluZywgdG9kb0xpc3RDb21wbGV0ZWQsIHByb2plY3RdO1xuXG4gIGNvbnN0IENyZWF0ZVRvZG8gPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY29tcGxldGVkKSB7XG4gICAgY29uc3QgdG9kbyA9IHt9O1xuICAgIHRvZG8udGl0bGUgPSB0aXRsZTtcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdG9kby5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0b2RvLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICB0b2RvLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRvZG8uY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIHJldHVybiB0b2RvO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgY29uc3QgbmV3VG9kbyA9IENyZWF0ZVRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgZmFsc2UpO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgPT0gdG9kYXkgJiYgbmV3VG9kby5wcm9qZWN0ID09ICdJbmJveCcpIHRvZG9MaXN0QXJyYXlUb2RheS5wdXNoKG5ld1RvZG8pO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgIT09IHRvZGF5ICYmIG5ld1RvZG8ucHJvamVjdCA9PSAnSW5ib3gnKSB0b2RvTGlzdEFycmF5VXBjb21pbmcucHVzaChuZXdUb2RvKTtcbiAgICBpZiAobmV3VG9kby5kdWVEYXRlICE9PSB0b2RheSAmJiBuZXdUb2RvLnByb2plY3QgIT09ICdJbmJveCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgdG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodG9kb0xpc3RBcnJheVtpXVswXSA9PSBuZXdUb2RvLnByb2plY3QpIHtcbiAgICAgICAgICB0b2RvTGlzdEFycmF5W2ldLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KHZhbHVlKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IFt2YWx1ZV07XG4gICAgdG9kb0xpc3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0QXJyYXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9kb0xpc3RDb3VudGVyKCkge1xuICAgIGxldCBpbmJveENvdW50ZXIgPSAwO1xuICAgIGxldCB0b2RheUNvdW50ZXIgPSAwO1xuICAgIGxldCB1cGNvbWluZ0NvdW50ZXIgPSAwO1xuICAgIGxldCBjb21wbGV0ZWRDb3VudGVyID0gMDtcblxuICAgIHRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JyAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgeyBpbmJveENvdW50ZXIrKyB9XG4gICAgfSkpO1xuICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKCdJbmJveCcsIGluYm94Q291bnRlcik7XG5cbiAgICB0b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uZHVlRGF0ZSA9PSB0b2RheSAmJiB0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSB0b2RheUNvdW50ZXIrK1xuICAgIH0pKTtcbiAgICB1aS5kaXNwbGF5TnVtYmVyT2ZUb2RvcygnVG9kYXknLCB0b2RheUNvdW50ZXIpO1xuXG4gICAgdG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmR1ZURhdGUgIT09IHRvZGF5ICYmIHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIHVwY29taW5nQ291bnRlcisrXG4gICAgfSkpO1xuICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKCdVcGNvbWluZycsIHVwY29taW5nQ291bnRlcik7XG5cbiAgICB0b2RvTGlzdENvbXBsZXRlZC5mb3JFYWNoKCgpID0+IGNvbXBsZXRlZENvdW50ZXIrKyk7XG4gICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MoJ0NvbXBsZXRlZCcsIGNvbXBsZXRlZENvdW50ZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDM7IGkgPCB0b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICB0b2RvTGlzdEFycmF5W2ldLmZvckVhY2goaXRlbSA9PiB7IGlmICh0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnKSB7IGNvdW50ZXIrKyB9IH0pO1xuICAgICAgbGV0IHByb2plY3QgPSB0b2RvTGlzdEFycmF5W2ldWzBdO1xuICAgICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MocHJvamVjdCwgY291bnRlcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVG9kbyhhcnJheSwgaW5kZXgpIHtcbiAgICB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGxldGVUb2RvKGFycmF5LCBpbmRleCkge1xuICAgIHRvZG9MaXN0QXJyYXlbYXJyYXldW2luZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRvZG8gPSB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRvZG9MaXN0Q29tcGxldGVkLnB1c2goY29tcGxldGVkVG9kb1swXSk7XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRvZG8sXG4gICAgYWRkUHJvamVjdCxcbiAgICB0b2RvTGlzdENvdW50ZXIsXG4gICAgcmVtb3ZlVG9kbyxcbiAgICBjb21wbGV0ZVRvZG8sXG4gICAgdG9kb0xpc3RBcnJheSxcbiAgICB0b2RvTGlzdENvbXBsZXRlZCxcbiAgICB0b2RheSxcbiAgICB0b21vcnJvdyxcbiAgICBuZXh0RGF5LFxuICAgIG5vd1xuICB9XG59IiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSBcImRhdGVmb3JtYXRcIjtcbmltcG9ydCB7IFRvZG9BcnJheUZ1bmN0aW9ucyB9IGZyb20gXCIuL1RvZG9BcnJheUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB0b2RvQXJyYXlGdW5jdGlvbnMgPSBUb2RvQXJyYXlGdW5jdGlvbnMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFVJRnVuY3Rpb25zKCkge1xuXG4gIGxldCBjdXJyZW50UGFnZSA9ICdJbmJveCc7XG5cbiAgY29uc3QgYWRkVG9kb0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG8tY29udGFpbmVyJyk7XG4gIGNvbnN0IGNhbmNlbFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbmNlbC1mb3JtJyk7XG4gIGNvbnN0IGFkZFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10b2RvLWZvcm0nKTtcblxuICBjb25zdCB0b2dnbGVUb2RvRm9ybSA9ICgpID0+IHtcbiAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgYWRkVG9kb0Zvcm1CdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgIGNsZWFyVG9kb0Zvcm0oKTtcbiAgfVxuXG4gIGNvbnN0IGFkZFByb2plY3RzRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdHMtY29udGFpbmVyJyk7XG4gIGNvbnN0IGNhbmNlbFByb2plY3RzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbmNlbC1wcm9qZWN0LWZvcm0tYnV0dG9uJyk7XG4gIGNvbnN0IGFkZFByb2plY3RzRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdHMtZm9ybScpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZVByb2plY3RGb3JtKCkge1xuICAgIGFkZFByb2plY3RzRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgYWRkUHJvamVjdHNGb3JtQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgICBjbGVhclByb2plY3RzRm9ybSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVByb2plY3QodGl0bGUpIHtcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24udmFsdWUgPSB0aXRsZTtcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIGNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzJyk7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgcHJvamVjdFRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xuICAgIHByb2plY3RUcmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmEtZGlhZ3JhbS1wcm9qZWN0Jyk7XG4gICAgcC5pbm5lckhUTUwgPSBgJHt0aXRsZX0gLSA8c3BhbiBkYXRhLWluZGV4PVwiJHt0aXRsZX1cIj48L3NwYW4+YDtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbmF2LWl0ZW0nKVxuICAgIGRpdi5hcHBlbmRDaGlsZChwcm9qZWN0VHJhc2hJY29uKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBwLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHRpdGxlKTtcbiAgICBwcm9qZWN0VHJhc2hJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHRpdGxlKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdGl0bGUpO1xuICB9XG5cbiAgY29uc3QgYWRkUHJvamVjdHNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdHMtaW5wdXQnKTtcbiAgY29uc3QgdG9kb1RpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZS1pbnB1dCcpO1xuICBjb25zdCB0b2RvRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRlc2NyaXB0aW9uLWlucHV0Jyk7XG4gIGNvbnN0IHRvZG9EdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1kdWUtZGF0ZS1pbnB1dCcpO1xuICBjb25zdCB0b2RvUHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXByaW9yaXR5LWlucHV0Jyk7XG4gIGNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zZWxlY3QnKTtcbiAgY29uc3QgYWRkUHJvamVjdHNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3RzLWJ1dHRvbicpO1xuICBjb25zdCBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvLWJ1dHRvbicpO1xuXG4gIGZ1bmN0aW9uIGNsZWFyUHJvamVjdHNGb3JtKCkge1xuICAgIGFkZFByb2plY3RzSW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVG9kb0Zvcm0oKSB7XG4gICAgdG9kb1RpdGxlSW5wdXQudmFsdWUgPSAnJztcbiAgICB0b2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUgPSAnJztcbiAgICB0b2RvUHJpb3JpdHlJbnB1dC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG5cbiAgZnVuY3Rpb24gZGlzcGxheVRvZG9MaXN0KCkge1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnSW5ib3gnKSB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7IGlmICh0eXBlb2YgKGl0ZW0pID09ICdvYmplY3QnICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleCkgfSkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT0gJ1RvZGF5Jykge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0QXJyYXkuZm9yRWFjaChhcnJheSA9PiBhcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4geyBpZiAoaXRlbS5kdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgZGlzcGxheVRvZG8oaXRlbSwgaW5kZXgpIH0pKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09ICdVcGNvbWluZycpIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5LmZvckVhY2goYXJyYXkgPT4gYXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHsgaWYgKGl0ZW0uZHVlRGF0ZSAhPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIHR5cGVvZiAoaXRlbSkgPT0gJ29iamVjdCcgJiYgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2UpIGRpc3BsYXlUb2RvKGl0ZW0sIGluZGV4KSB9KSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PSAnQ29tcGxldGVkJykge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q29tcGxldGVkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKGFycmF5ID0+IGFycmF5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7IGlmIChpdGVtLnByb2plY3QgPT0gY3VycmVudFBhZ2UgJiYgdHlwZW9mIChpdGVtKSA9PSAnb2JqZWN0JyAmJiBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZSkgZGlzcGxheVRvZG8oaXRlbSwgaW5kZXgpIH0pKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5VG9kbyh0b2RvLCBpbmRleCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleCk7XG5cbiAgICBpZiAodG9kby5kdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSAmJiB0b2RvLnByb2plY3QgPT0gJ0luYm94JykgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XG4gICAgaWYgKHRvZG8uZHVlRGF0ZSAhPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5ICYmIHRvZG8ucHJvamVjdCA9PSAnSW5ib3gnKSBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndXBjb21pbmcnKTtcbiAgICBpZiAodG9kby5kdWVEYXRlICE9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9kYXkgJiYgdG9kby5wcm9qZWN0ICE9PSAnSW5ib3gnKSBjb250YWluZXIuY2xhc3NMaXN0LmFkZCh0b2RvLnByb2plY3QpO1xuXG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tdGl0bGUnKTtcbiAgICBjb25zdCB0b2RvVGl0bGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICB0b2RvVGl0bGVUZXh0LnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcbiAgICBjb25zdCB0b2RvQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRvZG9DaGVja0JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICB0b2RvQ2hlY2tCb3guY2xhc3NMaXN0LmFkZCgnY2hlY2stYm94Jyk7XG4gICAgY29uc3QgdG9kb1RpdGxlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9UaXRsZVdyYXBwZXIuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBmbGV4OyBnYXA6IDFyZW07IGFsaWduLWl0ZW1zOiBjZW50ZXI7JztcbiAgICB0b2RvVGl0bGVXcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9DaGVja0JveCk7XG4gICAgdG9kb1RpdGxlV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvVGl0bGVUZXh0KTtcbiAgICB0b2RvVGl0bGUuYXBwZW5kQ2hpbGQodG9kb1RpdGxlV3JhcHBlcik7XG4gICAgY29uc3QgdG9kb1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICB0b2RvVHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gICAgdG9kb1RyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS10cmFzaCcpO1xuICAgIHRvZG9UaXRsZS5hcHBlbmRDaGlsZCh0b2RvVHJhc2hJY29uKTtcblxuICAgIGNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0b2RvRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmRlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb1ByaW9yaXR5LnN0eWxlLmNzc1RleHQgPSAnYm9yZGVyLXJhZGl1czogNnB4OyBmb250LXNpemU6IDAuN3JlbTsgcGFkZGluZzowLjJyZW0gMC40cmVtOyBkaXNwbGF5OiBncmlkOyBwbGFjZS1pdGVtczogY2VudGVyOyBmb250LXdlaWdodDogNjAwOyc7XG5cbiAgICBpZiAodG9kby5wcmlvcml0eSA9PSAnbG93JyB8fCB0b2RvLnByaW9yaXR5ID09ICcnKSB7XG4gICAgICB0b2RvUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZWVuJztcbiAgICAgIHRvZG9Qcmlvcml0eS50ZXh0Q29udGVudCA9ICdMb3cgUHJpb3JpdHknO1xuICAgIH0gZWxzZSBpZiAodG9kby5wcmlvcml0eSA9PSAnbWVkaXVtJykge1xuICAgICAgdG9kb1ByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgdG9kb1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ01lZGl1bSBQcmlvcml0eSc7XG4gICAgfSBlbHNlIGlmICh0b2RvLnByaW9yaXR5ID09ICdoaWdoJykge1xuICAgICAgdG9kb1ByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgdG9kb1ByaW9yaXR5LnRleHRDb250ZW50ID0gJ0hpZ2ggUHJpb3JpdHknO1xuICAgIH1cbiAgICBjb25zdCBwcmlvcml0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByaW9yaXR5Q29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSAncGFkZGluZzogMC40cmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvcjMpOyBib3JkZXItcmFkaXVzOiAxMHB4OyBkaXNwbGF5OiBncmlkOyBwbGFjZS1pdGVtczogY2VudGVyOydcbiAgICBwcmlvcml0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvUHJpb3JpdHkpO1xuXG4gICAgY29uc3QgdG9kb0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdG9kb0R1ZURhdGUudGV4dENvbnRlbnQgPSBjYWxjdWxhdGVSZW1haW5pbmdEYXlzKHRvZG8uZHVlRGF0ZSk7XG4gICAgdG9kb0R1ZURhdGUuc3R5bGUuY3NzVGV4dCA9ICdtYXJnaW46IDA7J1xuXG4gICAgY29uc3QgZHVlRGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGR1ZURhdGVDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6IDAuOXJlbTsgcGFkZGluZzogMC41cmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvcjMpOyBib3JkZXItcmFkaXVzOiAxMHB4OyBkaXNwbGF5OiBncmlkOyBwbGFjZS1pdGVtczogY2VudGVyOydcbiAgICBkdWVEYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9EdWVEYXRlKTtcblxuICAgIGNvbnN0IGZsZXhEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmbGV4RGl2LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAycmVtOydcbiAgICBmbGV4RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5Q29udGFpbmVyKTtcbiAgICBmbGV4RGl2LmFwcGVuZENoaWxkKGR1ZURhdGVDb250YWluZXIpO1xuICAgIGlmICh0b2RvLnByb2plY3QgIT09ICdJbmJveCcpIHtcbiAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHByb2plY3RDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6IDAuOXJlbTsgcGFkZGluZzogMC41cmVtOyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvcjMpOyBib3JkZXItcmFkaXVzOiAxMHB4OyBkaXNwbGF5OiBncmlkOyBwbGFjZS1pdGVtczogY2VudGVyOydcbiAgICAgIHByb2plY3RDb250YWluZXIuaW5uZXJIVE1MID0gdG9kby5wcm9qZWN0O1xuICAgICAgZmxleERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBpZiAodG9kby5jb21wbGV0ZWQgPT0gdHJ1ZSkge1xuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2xpbmUtdGhyb3VnaCcpO1xuICAgICAgdG9kb1RyYXNoSWNvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdG9kb0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgdG9kb0NoZWNrQm94LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0Rlc2NyaXB0aW9uKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZmxleERpdik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlUmVtYWluaW5nRGF5cyhkdWVEYXRlKSB7XG4gICAgaWYgKGR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvZGF5KSB7XG4gICAgICByZXR1cm4gYER1ZSB0b2RheSFgO1xuICAgIH0gZWxzZSBpZiAoZHVlRGF0ZSA9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9tb3Jyb3cpIHtcbiAgICAgIHJldHVybiBgRHVlIHRvbW9ycm93IWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLm5leHREYXkuc2V0RGF0ZSh0b2RvQXJyYXlGdW5jdGlvbnMubm93LmdldERhdGUoKSArIGkpO1xuICAgICAgICBpZiAoZHVlRGF0ZSA9PSBkYXRlRm9ybWF0KHRvZG9BcnJheUZ1bmN0aW9ucy5uZXh0RGF5LCAneXl5eS1tbS1kZCcpKSB7XG4gICAgICAgICAgcmV0dXJuIGBEdWUgaW4gJHtpfSBkYXlzYFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhcicpO1xuXG4gIGZ1bmN0aW9uIHN3aXRjaFRvZG9MaXN0VHlwZShlKSB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50RWxlbWVudCk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWl0ZW0nKSB8fCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWl0ZW0nKSB8fCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtaXRlbScpKSB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdHMtY29udGFpbmVyJykgfHwgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0cy1jb250YWluZXInKSkgcmV0dXJuO1xuICAgICAgY29uc3QgdG9kb0xpc3RUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC10eXBlJyk7XG4gICAgICB0b2RvTGlzdFR5cGUuaW5uZXJIVE1MID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgIGN1cnJlbnRQYWdlID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgdG9nZ2xlU2lkZUJhcigpO1xuICAgICAgY29uc29sZS5sb2coY3VycmVudFBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrQ29tcGxldGVUb2RvKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVjay1ib3gnKSkge1xuICAgICAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgaW5kZXggPSBub2RlLmRhdGFzZXQuaW5kZXg7XG4gICAgICBjb25zb2xlLmxvZyh7IG5vZGUsIGluZGV4IH0pXG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2xpbmUtdGhyb3VnaCcpO1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2RheScpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oMCwgaW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygndXBjb21pbmcnKSkge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuY29tcGxldGVUb2RvKDEsIGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBub2RlLmNsYXNzTGlzdFswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheVtpXVswXSA9PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuY29tcGxldGVUb2RvKGksIGluZGV4KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb3VudGVyKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGlja1JlbW92ZVRvZG8oZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhLXRyYXNoJykpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBpbmRleCA9IG5vZGUuZGF0YXNldC5pbmRleDtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygndG9kYXknKSkge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMucmVtb3ZlVG9kbygwLCBpbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd1cGNvbWluZycpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5yZW1vdmVUb2RvKDEsIGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBub2RlLmNsYXNzTGlzdFswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheVtpXVswXSA9PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMucmVtb3ZlVG9kbyhpLCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkaXNwbGF5VG9kb0xpc3QoKTtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVTaWRlQmFyKCkge1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZS1iYXItaGlkZScpO1xuICB9XG5cbiAgY29uc3QgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXJnZXItbWVudScpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGFkZFRvZG9Gb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVG9kb0Zvcm0pO1xuICAgIGNhbmNlbFRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVG9kb0Zvcm0pO1xuICAgIGFkZFByb2plY3RzRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVByb2plY3RGb3JtKTtcbiAgICBjYW5jZWxQcm9qZWN0c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVByb2plY3RGb3JtKTtcbiAgICBhZGRUb2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmFkZFRvZG8odG9kb1RpdGxlSW5wdXQudmFsdWUsXG4gICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlLFxuICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnZhbHVlLFxuICAgICAgICB0b2RvUHJpb3JpdHlJbnB1dC52YWx1ZSxcbiAgICAgICAgcHJvamVjdFNlbGVjdC52YWx1ZSk7XG4gICAgICB0b2dnbGVUb2RvRm9ybSgpO1xuICAgICAgZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb3VudGVyKCk7XG4gICAgfSk7XG4gICAgYWRkUHJvamVjdHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuYWRkUHJvamVjdChhZGRQcm9qZWN0c0lucHV0LnZhbHVlKTtcbiAgICAgIGRpc3BsYXlQcm9qZWN0KGFkZFByb2plY3RzSW5wdXQudmFsdWUpO1xuICAgICAgdG9nZ2xlUHJvamVjdEZvcm0oKTtcbiAgICB9KTtcbiAgICBzaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHN3aXRjaFRvZG9MaXN0VHlwZShlKSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlVG9kbyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1JlbW92ZVRvZG8pO1xuICAgIGJ1cmdlck1lbnUuZm9yRWFjaChtZW51ID0+IG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTaWRlQmFyKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5TnVtYmVyT2ZUb2RvcyhsaXN0VHlwZSwgY291bnRlcikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNwYW5bZGF0YS1pbmRleD1cIiR7bGlzdFR5cGV9XCJdYCkudGV4dENvbnRlbnQgPSBjb3VudGVyO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBldmVudExpc3RlbmVycyxcbiAgICBkaXNwbGF5VG9kb0xpc3QsXG4gICAgZGlzcGxheU51bWJlck9mVG9kb3NcbiAgfVxufSIsInZhciB0b2tlbj0vZHsxLDR9fER7Myw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFd7MSwyfXxbTGxvcFNaTl18XCJbXlwiXSpcInwnW14nXSonL2c7dmFyIHRpbWV6b25lPS9cXGIoPzpbQS1aXXsxLDN9W0EtWl1bVENdKSg/OlstK11cXGR7NH0pP3woKD86QXVzdHJhbGlhbiApPyg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lKVxcYi9nO3ZhciB0aW1lem9uZUNsaXA9L1teLStcXGRBLVpdL2c7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0ZUZvcm1hdChkYXRlLG1hc2ssdXRjLGdtdCl7aWYoYXJndW1lbnRzLmxlbmd0aD09PTEmJnR5cGVvZiBkYXRlPT09XCJzdHJpbmdcIiYmIS9cXGQvLnRlc3QoZGF0ZSkpe21hc2s9ZGF0ZTtkYXRlPXVuZGVmaW5lZH1kYXRlPWRhdGV8fGRhdGU9PT0wP2RhdGU6bmV3IERhdGU7aWYoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpe2RhdGU9bmV3IERhdGUoZGF0ZSl9aWYoaXNOYU4oZGF0ZSkpe3Rocm93IFR5cGVFcnJvcihcIkludmFsaWQgZGF0ZVwiKX1tYXNrPVN0cmluZyhtYXNrc1ttYXNrXXx8bWFza3x8bWFza3NbXCJkZWZhdWx0XCJdKTt2YXIgbWFza1NsaWNlPW1hc2suc2xpY2UoMCw0KTtpZihtYXNrU2xpY2U9PT1cIlVUQzpcInx8bWFza1NsaWNlPT09XCJHTVQ6XCIpe21hc2s9bWFzay5zbGljZSg0KTt1dGM9dHJ1ZTtpZihtYXNrU2xpY2U9PT1cIkdNVDpcIil7Z210PXRydWV9fXZhciBfPWZ1bmN0aW9uIF8oKXtyZXR1cm4gdXRjP1wiZ2V0VVRDXCI6XCJnZXRcIn07dmFyIF9kPWZ1bmN0aW9uIGQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXRlXCJdKCl9O3ZhciBEPWZ1bmN0aW9uIEQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXlcIl0oKX07dmFyIF9tPWZ1bmN0aW9uIG0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNb250aFwiXSgpfTt2YXIgeT1mdW5jdGlvbiB5KCl7cmV0dXJuIGRhdGVbXygpK1wiRnVsbFllYXJcIl0oKX07dmFyIF9IPWZ1bmN0aW9uIEgoKXtyZXR1cm4gZGF0ZVtfKCkrXCJIb3Vyc1wiXSgpfTt2YXIgX009ZnVuY3Rpb24gTSgpe3JldHVybiBkYXRlW18oKStcIk1pbnV0ZXNcIl0oKX07dmFyIF9zPWZ1bmN0aW9uIHMoKXtyZXR1cm4gZGF0ZVtfKCkrXCJTZWNvbmRzXCJdKCl9O3ZhciBfTD1mdW5jdGlvbiBMKCl7cmV0dXJuIGRhdGVbXygpK1wiTWlsbGlzZWNvbmRzXCJdKCl9O3ZhciBfbz1mdW5jdGlvbiBvKCl7cmV0dXJuIHV0Yz8wOmRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKX07dmFyIF9XPWZ1bmN0aW9uIFcoKXtyZXR1cm4gZ2V0V2VlayhkYXRlKX07dmFyIF9OPWZ1bmN0aW9uIE4oKXtyZXR1cm4gZ2V0RGF5T2ZXZWVrKGRhdGUpfTt2YXIgZmxhZ3M9e2Q6ZnVuY3Rpb24gZCgpe3JldHVybiBfZCgpfSxkZDpmdW5jdGlvbiBkZCgpe3JldHVybiBwYWQoX2QoKSl9LGRkZDpmdW5jdGlvbiBkZGQoKXtyZXR1cm4gaTE4bi5kYXlOYW1lc1tEKCldfSxEREQ6ZnVuY3Rpb24gREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKV0sc2hvcnQ6dHJ1ZX0pfSxkZGRkOmZ1bmN0aW9uIGRkZGQoKXtyZXR1cm4gaTE4bi5kYXlOYW1lc1tEKCkrN119LEREREQ6ZnVuY3Rpb24gRERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCkrN119KX0sbTpmdW5jdGlvbiBtKCl7cmV0dXJuIF9tKCkrMX0sbW06ZnVuY3Rpb24gbW0oKXtyZXR1cm4gcGFkKF9tKCkrMSl9LG1tbTpmdW5jdGlvbiBtbW0oKXtyZXR1cm4gaTE4bi5tb250aE5hbWVzW19tKCldfSxtbW1tOmZ1bmN0aW9uIG1tbW0oKXtyZXR1cm4gaTE4bi5tb250aE5hbWVzW19tKCkrMTJdfSx5eTpmdW5jdGlvbiB5eSgpe3JldHVybiBTdHJpbmcoeSgpKS5zbGljZSgyKX0seXl5eTpmdW5jdGlvbiB5eXl5KCl7cmV0dXJuIHBhZCh5KCksNCl9LGg6ZnVuY3Rpb24gaCgpe3JldHVybiBfSCgpJTEyfHwxMn0saGg6ZnVuY3Rpb24gaGgoKXtyZXR1cm4gcGFkKF9IKCklMTJ8fDEyKX0sSDpmdW5jdGlvbiBIKCl7cmV0dXJuIF9IKCl9LEhIOmZ1bmN0aW9uIEhIKCl7cmV0dXJuIHBhZChfSCgpKX0sTTpmdW5jdGlvbiBNKCl7cmV0dXJuIF9NKCl9LE1NOmZ1bmN0aW9uIE1NKCl7cmV0dXJuIHBhZChfTSgpKX0sczpmdW5jdGlvbiBzKCl7cmV0dXJuIF9zKCl9LHNzOmZ1bmN0aW9uIHNzKCl7cmV0dXJuIHBhZChfcygpKX0sbDpmdW5jdGlvbiBsKCl7cmV0dXJuIHBhZChfTCgpLDMpfSxMOmZ1bmN0aW9uIEwoKXtyZXR1cm4gcGFkKE1hdGguZmxvb3IoX0woKS8xMCkpfSx0OmZ1bmN0aW9uIHQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1swXTppMThuLnRpbWVOYW1lc1sxXX0sdHQ6ZnVuY3Rpb24gdHQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1syXTppMThuLnRpbWVOYW1lc1szXX0sVDpmdW5jdGlvbiBUKCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbNF06aTE4bi50aW1lTmFtZXNbNV19LFRUOmZ1bmN0aW9uIFRUKCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbNl06aTE4bi50aW1lTmFtZXNbN119LFo6ZnVuY3Rpb24gWigpe3JldHVybiBnbXQ/XCJHTVRcIjp1dGM/XCJVVENcIjpmb3JtYXRUaW1lem9uZShkYXRlKX0sbzpmdW5jdGlvbiBvKCl7cmV0dXJuKF9vKCk+MD9cIi1cIjpcIitcIikrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSkvNjApKjEwMCtNYXRoLmFicyhfbygpKSU2MCw0KX0scDpmdW5jdGlvbiBwKCl7cmV0dXJuKF9vKCk+MD9cIi1cIjpcIitcIikrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSkvNjApLDIpK1wiOlwiK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpJTYwKSwyKX0sUzpmdW5jdGlvbiBTKCl7cmV0dXJuW1widGhcIixcInN0XCIsXCJuZFwiLFwicmRcIl1bX2QoKSUxMD4zPzA6KF9kKCklMTAwLV9kKCklMTAhPTEwKSpfZCgpJTEwXX0sVzpmdW5jdGlvbiBXKCl7cmV0dXJuIF9XKCl9LFdXOmZ1bmN0aW9uIFdXKCl7cmV0dXJuIHBhZChfVygpKX0sTjpmdW5jdGlvbiBOKCl7cmV0dXJuIF9OKCl9fTtyZXR1cm4gbWFzay5yZXBsYWNlKHRva2VuLGZ1bmN0aW9uKG1hdGNoKXtpZihtYXRjaCBpbiBmbGFncyl7cmV0dXJuIGZsYWdzW21hdGNoXSgpfXJldHVybiBtYXRjaC5zbGljZSgxLG1hdGNoLmxlbmd0aC0xKX0pfWV4cG9ydCB2YXIgbWFza3M9e2RlZmF1bHQ6XCJkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3NcIixzaG9ydERhdGU6XCJtL2QveXlcIixwYWRkZWRTaG9ydERhdGU6XCJtbS9kZC95eXl5XCIsbWVkaXVtRGF0ZTpcIm1tbSBkLCB5eXl5XCIsbG9uZ0RhdGU6XCJtbW1tIGQsIHl5eXlcIixmdWxsRGF0ZTpcImRkZGQsIG1tbW0gZCwgeXl5eVwiLHNob3J0VGltZTpcImg6TU0gVFRcIixtZWRpdW1UaW1lOlwiaDpNTTpzcyBUVFwiLGxvbmdUaW1lOlwiaDpNTTpzcyBUVCBaXCIsaXNvRGF0ZTpcInl5eXktbW0tZGRcIixpc29UaW1lOlwiSEg6TU06c3NcIixpc29EYXRlVGltZTpcInl5eXktbW0tZGQnVCdISDpNTTpzc29cIixpc29VdGNEYXRlVGltZTpcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIixleHBpcmVzSGVhZGVyRm9ybWF0OlwiZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaXCJ9O2V4cG9ydCB2YXIgaTE4bj17ZGF5TmFtZXM6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCIsXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxtb250aE5hbWVzOltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIixcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSx0aW1lTmFtZXM6W1wiYVwiLFwicFwiLFwiYW1cIixcInBtXCIsXCJBXCIsXCJQXCIsXCJBTVwiLFwiUE1cIl19O3ZhciBwYWQ9ZnVuY3Rpb24gcGFkKHZhbCl7dmFyIGxlbj1hcmd1bWVudHMubGVuZ3RoPjEmJmFyZ3VtZW50c1sxXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMV06MjtyZXR1cm4gU3RyaW5nKHZhbCkucGFkU3RhcnQobGVuLFwiMFwiKX07dmFyIGdldERheU5hbWU9ZnVuY3Rpb24gZ2V0RGF5TmFtZShfcmVmKXt2YXIgeT1fcmVmLnksbT1fcmVmLm0sZD1fcmVmLmQsXz1fcmVmLl8sZGF5TmFtZT1fcmVmLmRheU5hbWUsX3JlZiRzaG9ydD1fcmVmW1wic2hvcnRcIl0sX3Nob3J0PV9yZWYkc2hvcnQ9PT12b2lkIDA/ZmFsc2U6X3JlZiRzaG9ydDt2YXIgdG9kYXk9bmV3IERhdGU7dmFyIHllc3RlcmRheT1uZXcgRGF0ZTt5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKS0xKTt2YXIgdG9tb3Jyb3c9bmV3IERhdGU7dG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvd1tfK1wiRGF0ZVwiXSgpKzEpO3ZhciB0b2RheV9kPWZ1bmN0aW9uIHRvZGF5X2QoKXtyZXR1cm4gdG9kYXlbXytcIkRhdGVcIl0oKX07dmFyIHRvZGF5X209ZnVuY3Rpb24gdG9kYXlfbSgpe3JldHVybiB0b2RheVtfK1wiTW9udGhcIl0oKX07dmFyIHRvZGF5X3k9ZnVuY3Rpb24gdG9kYXlfeSgpe3JldHVybiB0b2RheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHllc3RlcmRheV9kPWZ1bmN0aW9uIHllc3RlcmRheV9kKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpfTt2YXIgeWVzdGVyZGF5X209ZnVuY3Rpb24geWVzdGVyZGF5X20oKXtyZXR1cm4geWVzdGVyZGF5W18rXCJNb250aFwiXSgpfTt2YXIgeWVzdGVyZGF5X3k9ZnVuY3Rpb24geWVzdGVyZGF5X3koKXtyZXR1cm4geWVzdGVyZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgdG9tb3Jyb3dfZD1mdW5jdGlvbiB0b21vcnJvd19kKCl7cmV0dXJuIHRvbW9ycm93W18rXCJEYXRlXCJdKCl9O3ZhciB0b21vcnJvd19tPWZ1bmN0aW9uIHRvbW9ycm93X20oKXtyZXR1cm4gdG9tb3Jyb3dbXytcIk1vbnRoXCJdKCl9O3ZhciB0b21vcnJvd195PWZ1bmN0aW9uIHRvbW9ycm93X3koKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkZ1bGxZZWFyXCJdKCl9O2lmKHRvZGF5X3koKT09PXkmJnRvZGF5X20oKT09PW0mJnRvZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUZHlcIjpcIlRvZGF5XCJ9ZWxzZSBpZih5ZXN0ZXJkYXlfeSgpPT09eSYmeWVzdGVyZGF5X20oKT09PW0mJnllc3RlcmRheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiWXNkXCI6XCJZZXN0ZXJkYXlcIn1lbHNlIGlmKHRvbW9ycm93X3koKT09PXkmJnRvbW9ycm93X20oKT09PW0mJnRvbW9ycm93X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUbXdcIjpcIlRvbW9ycm93XCJ9cmV0dXJuIGRheU5hbWV9O3ZhciBnZXRXZWVrPWZ1bmN0aW9uIGdldFdlZWsoZGF0ZSl7dmFyIHRhcmdldFRodXJzZGF5PW5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkpO3RhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpLSh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBmaXJzdFRodXJzZGF5PW5ldyBEYXRlKHRhcmdldFRodXJzZGF5LmdldEZ1bGxZZWFyKCksMCw0KTtmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCktKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZHM9dGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKS1maXJzdFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCk7dGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKS1kcyk7dmFyIHdlZWtEaWZmPSh0YXJnZXRUaHVyc2RheS1maXJzdFRodXJzZGF5KS8oODY0ZTUqNyk7cmV0dXJuIDErTWF0aC5mbG9vcih3ZWVrRGlmZil9O3ZhciBnZXREYXlPZldlZWs9ZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpe3ZhciBkb3c9ZGF0ZS5nZXREYXkoKTtpZihkb3c9PT0wKXtkb3c9N31yZXR1cm4gZG93fTtleHBvcnQgdmFyIGZvcm1hdFRpbWV6b25lPWZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lKGRhdGUpe3JldHVybihTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpfHxbXCJcIl0pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLFwiXCIpLnJlcGxhY2UoL0dNVFxcKzAwMDAvZyxcIlVUQ1wiKX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tIFwiZGF0ZWZvcm1hdFwiO1xuaW1wb3J0IHsgVG9kb0FycmF5RnVuY3Rpb25zIH0gZnJvbSBcIi4vVG9kb0FycmF5RnVuY3Rpb25zXCI7XG5pbXBvcnQgeyBVSUZ1bmN0aW9ucyB9IGZyb20gXCIuL1VJRnVuY3Rpb25zXCI7XG5cblxuY29uc3QgdWkgPSBVSUZ1bmN0aW9ucygpO1xuY29uc3QgdG9kb0FycmF5RnVuY3Rpb25zID0gVG9kb0FycmF5RnVuY3Rpb25zKCk7XG5cbnVpLmV2ZW50TGlzdGVuZXJzKCk7XG51aS5kaXNwbGF5VG9kb0xpc3QoKTtcbnRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9