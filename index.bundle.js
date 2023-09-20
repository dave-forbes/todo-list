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
  const today = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(now, "yyyy-mm-dd");
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);
  const tomorrow = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(nextDay, "yyyy-mm-dd");

  let todoListArrayToday;
  let todoListArrayUpcoming;
  let todoListCompleted;
  const todoListArray = [];

  // Shit code below to try and access todos on local storage or load in example todos

  if (localStorage.getItem("todoListArrayToday")) {
    todoListArrayToday = JSON.parse(localStorage.getItem("todoListArrayToday"));
    todoListArrayUpcoming = JSON.parse(
      localStorage.getItem("todoListArrayUpcoming")
    );
    todoListCompleted = JSON.parse(localStorage.getItem("todoListCompleted"));
  } else {
    todoListArrayToday = [
      {
        title: "Task for today",
        description: "something here",
        priority: "medium",
        dueDate: today,
        project: "Inbox",
        completed: false,
      },
    ];
    todoListArrayUpcoming = [
      {
        title: "Task for tomorrow",
        description: "something here",
        priority: "medium",
        dueDate: tomorrow,
        project: "Inbox",
        completed: false,
      },
      {
        title: "Task for next week",
        description: "something here",
        priority: "medium",
        dueDate: "2023-09-25",
        project: "Inbox",
        completed: false,
      },
    ];
    todoListCompleted = [];
  }

  todoListArray.push(todoListArrayToday);
  todoListArray.push(todoListArrayUpcoming);
  todoListArray.push(todoListCompleted);

  // Shit code above to try and access todos on local storage or load in example todos

  const CreateTodo = function (
    title,
    description,
    dueDate,
    priority,
    project,
    completed
  ) {
    const todo = {};
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    todo.project = project;
    todo.completed = completed;
    return todo;
  };

  function addTodo(title, description, dueDate, priority, project) {
    const newTodo = CreateTodo(
      title,
      description,
      dueDate,
      priority,
      project,
      false
    );
    if (newTodo.dueDate == today && newTodo.project == "Inbox")
      todoListArrayToday.push(newTodo);
    if (newTodo.dueDate !== today && newTodo.project == "Inbox")
      todoListArrayUpcoming.push(newTodo);
    if (newTodo.project !== "Inbox") {
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

    todoListArray.forEach((array) =>
      array.forEach((item) => {
        if (typeof item == "object" && item.completed == false) {
          inboxCounter++;
        }
      })
    );
    ui.displayNumberOfTodos("Inbox", inboxCounter);

    todoListArray.forEach((array) =>
      array.forEach((item) => {
        if (
          item.dueDate == today &&
          typeof item == "object" &&
          item.completed == false
        )
          todayCounter++;
      })
    );
    ui.displayNumberOfTodos("Today", todayCounter);

    todoListArray.forEach((array) =>
      array.forEach((item) => {
        if (
          item.dueDate !== today &&
          typeof item == "object" &&
          item.completed == false
        )
          upcomingCounter++;
      })
    );
    ui.displayNumberOfTodos("Upcoming", upcomingCounter);

    todoListCompleted.forEach(() => completedCounter++);
    ui.displayNumberOfTodos("Completed", completedCounter);

    for (let i = 3; i < todoListArray.length; i++) {
      let counter = 0;
      todoListArray[i].forEach((item) => {
        if (typeof item == "object") {
          counter++;
        }
      });
      let project = todoListArray[i][0];
      ui.displayNumberOfTodos(project, counter);
    }
  }

  function removeTodo(array, index) {
    todoListArray[array].splice(index, 1);
    updateLocalStorage();
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
    localStorage.setItem(
      "todoListArrayToday",
      JSON.stringify(todoListArrayToday)
    );
    localStorage.setItem(
      "todoListArrayUpcoming",
      JSON.stringify(todoListArrayUpcoming)
    );
    localStorage.setItem(
      "todoListCompleted",
      JSON.stringify(todoListCompleted)
    );

    for (let i = 3; i < todoListArray.length; i++) {
      localStorage.setItem(
        todoListArray[i][0],
        JSON.stringify(todoListArray[i])
      );
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
  };
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
  let currentPage = "Inbox";

  const addTodoFormButton = document.querySelector(".add-todo-container");
  const cancelTodoForm = document.querySelector("#cancel-form");
  const addTodoForm = document.querySelector(".add-todo-form");

  function toggleTodoForm(text) {
    if (todoToEditNode) todoToEditNode.classList.toggle("hide");
    addTodoForm.classList.toggle("hide");
    addTodoFormButton.classList.toggle("hide");
    const addTodoButton = document.querySelector("#add-todo-button");
    addTodoButton.textContent = `${text}`;
    clearTodoForm();
  }

  const addProjectsFormButton = document.querySelector(
    ".add-projects-container"
  );
  const cancelProjectsButton = document.querySelector(
    "#cancel-project-form-button"
  );
  const addProjectsForm = document.querySelector(".add-projects-form");

  function toggleProjectForm() {
    addProjectsForm.classList.toggle("hide");
    addProjectsFormButton.classList.toggle("hide");
    clearProjectsForm();
  }

  function displayProject(title) {
    const option = document.createElement("option");
    option.value = title;
    option.innerHTML = title;
    projectSelect.appendChild(option);
    const projectsDiv = document.querySelector("#projects");
    const p = document.createElement("p");
    p.style.textAlign = "center";
    const projectTrashIcon = document.createElement("i");
    projectTrashIcon.classList.add("fa-solid");
    projectTrashIcon.classList.add("fa-diagram-project");
    p.innerHTML = `${title} - <span data-index="${title}"></span>`;
    const div = document.createElement("div");
    div.classList.add("nav-item");
    div.appendChild(projectTrashIcon);
    div.appendChild(p);
    projectsDiv.appendChild(div);
    p.setAttribute("data-index", title);
    projectTrashIcon.setAttribute("data-index", title);
    div.setAttribute("data-index", title);
  }

  const addProjectsInput = document.querySelector("#add-projects-input");
  const todoTitleInput = document.querySelector("#todo-title-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input"
  );
  const todoDueDateInput = document.querySelector("#todo-due-date-input");
  const todoPriorityInput = document.querySelector("#todo-priority-input");
  const projectSelect = document.querySelector("#project-select");
  const addProjectsButton = document.querySelector("#add-projects-button");
  const addTodoButton = document.querySelector("#add-todo-button");

  function clearProjectsForm() {
    addProjectsInput.value = "";
  }

  function clearTodoForm() {
    todoTitleInput.value = "";
    todoDescriptionInput.value = "";
    todoDueDateInput.value = "";
    todoPriorityInput.value = "";
  }

  const todoList = document.querySelector(".todo-list");

  function displayTodoList() {
    todoList.innerHTML = "";
    if (currentPage == "Inbox") {
      todoArrayFunctions.todoListArray.forEach((array) =>
        array.forEach((item, index) => {
          if (typeof item == "object" && item.completed == false)
            displayTodo(item, index);
        })
      );
    } else if (currentPage == "Today") {
      todoArrayFunctions.todoListArray.forEach((array) =>
        array.forEach((item, index) => {
          if (
            item.dueDate == todoArrayFunctions.today &&
            item.completed == false
          )
            displayTodo(item, index);
        })
      );
    } else if (currentPage == "Upcoming") {
      todoArrayFunctions.todoListArray.forEach((array) =>
        array.forEach((item, index) => {
          if (
            item.dueDate !== todoArrayFunctions.today &&
            typeof item == "object" &&
            item.completed == false
          ) {
            displayTodo(item, index);
          }
        })
      );
    } else if (currentPage == "Completed") {
      todoArrayFunctions.todoListCompleted.forEach((item, index) =>
        displayTodo(item, index)
      );
    } else {
      todoArrayFunctions.todoListArray.forEach((array) =>
        array.forEach((item, index) => {
          if (
            item.project == currentPage &&
            typeof item == "object" &&
            item.completed == false
          ) {
            displayTodo(item, index);
          }
        })
      );
    }
  }

  function displayTodo(todo, index) {
    const container = document.createElement("div");
    container.setAttribute("data-index", index);

    if (todo.dueDate == todoArrayFunctions.today && todo.project == "Inbox")
      container.classList.add("today");
    if (todo.dueDate !== todoArrayFunctions.today && todo.project == "Inbox")
      container.classList.add("upcoming");
    if (todo.project !== "Inbox") container.classList.add(todo.project);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    const todoTitleText = document.createElement("h4");
    todoTitleText.textContent = todo.title;
    const todoCheckBox = document.createElement("input");
    todoCheckBox.setAttribute("type", "checkbox");
    todoCheckBox.classList.add("check-box");
    const todoTitleWrapper = document.createElement("div");
    todoTitleWrapper.style.cssText =
      "display: flex; gap: 1rem; align-items: center;";
    todoTitleWrapper.appendChild(todoCheckBox);
    todoTitleWrapper.appendChild(todoTitleText);
    todoTitle.appendChild(todoTitleWrapper);
    const todoTitleIconWrapper = document.createElement("div");
    todoTitleIconWrapper.style.cssText = "display: flex; gap: 2rem;";
    const todoEditIcon = document.createElement("i");
    todoEditIcon.classList.add("fa-solid");
    todoEditIcon.classList.add("fa-pen-to-square");
    const todoTrashIcon = document.createElement("i");
    todoTrashIcon.classList.add("fa-solid");
    todoTrashIcon.classList.add("fa-trash");
    todoTitleIconWrapper.appendChild(todoEditIcon);
    todoTitleIconWrapper.appendChild(todoTrashIcon);
    todoTitle.appendChild(todoTitleIconWrapper);

    const todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description;

    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-priority");

    if (todo.priority == "low" || todo.priority == "") {
      todoPriority.style.backgroundColor = "green";
      todoPriority.textContent = "Low Priority";
    } else if (todo.priority == "medium") {
      todoPriority.style.backgroundColor = "orange";
      todoPriority.textContent = "Medium Priority";
    } else if (todo.priority == "high") {
      todoPriority.style.backgroundColor = "red";
      todoPriority.textContent = "High Priority";
    }
    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add("todo-priority");
    priorityContainer.classList.add("todo-containers");
    priorityContainer.appendChild(todoPriority);

    const todoDueDate = document.createElement("p");
    todoDueDate.textContent = calculateRemainingDays(todo.dueDate);
    todoDueDate.style.cssText = "margin: 0;";

    const dueDateContainer = document.createElement("div");
    dueDateContainer.classList.add("todo-due-date");
    dueDateContainer.classList.add("todo-containers");
    dueDateContainer.appendChild(todoDueDate);

    const flexDiv = document.createElement("div");
    flexDiv.style.cssText = "display: flex; align-items: center; gap: 2rem;";
    flexDiv.appendChild(priorityContainer);
    flexDiv.appendChild(dueDateContainer);
    if (todo.project !== "Inbox") {
      const projectContainer = document.createElement("div");
      projectContainer.classList.add("todo-project");
      projectContainer.classList.add("todo-containers");
      projectContainer.innerHTML = todo.project;
      flexDiv.appendChild(projectContainer);
    }

    if (todo.completed == true) {
      container.classList.add("line-through");
      todoTrashIcon.style.display = "none";
      todoCheckBox.checked = true;
      todoCheckBox.disabled = true;
    }

    container.appendChild(todoTitle);
    container.appendChild(todoDescription);
    container.appendChild(flexDiv);
    container.classList.add("todo");
    todoList.appendChild(container);
  }

  function calculateRemainingDays(dueDate) {
    if (dueDate == todoArrayFunctions.today) {
      return `Due today!`;
    } else if (dueDate == todoArrayFunctions.tomorrow) {
      return `Due tomorrow!`;
    } else {
      for (let i = 0; i < 100; i++) {
        todoArrayFunctions.nextDay.setDate(
          todoArrayFunctions.now.getDate() + i
        );
        if (dueDate == (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(todoArrayFunctions.nextDay, "yyyy-mm-dd")) {
          return `Due in ${i} days`;
        }
      }
    }
  }

  const sideBar = document.querySelector(".side-bar");

  function switchTodoListType(e) {
    console.log(e.target.parentElement);
    if (
      e.target.classList.contains("nav-item") ||
      e.target.parentElement.classList.contains("nav-item") ||
      e.target.parentElement.parentElement.classList.contains("nav-item")
    ) {
      if (
        e.target.classList.contains("add-projects-container") ||
        e.target.parentElement.classList.contains("add-projects-container")
      )
        return;
      const todoListType = document.querySelector(".todo-list-type");
      todoListType.innerHTML = e.target.dataset.index;
      currentPage = e.target.dataset.index;
      displayTodoList();
      toggleSideBar();
    }
  }

  function checkCompleteTodo(e) {
    if (e.target.classList.contains("check-box")) {
      const node = e.target.parentElement.parentElement.parentElement;
      const index = node.dataset.index;
      console.log({ node, index });
      node.classList.add("line-through");
      if (node.classList.contains("today")) {
        todoArrayFunctions.completeTodo(0, index);
      } else if (node.classList.contains("upcoming")) {
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
    if (e.target.classList.contains("fa-trash")) {
      const node = e.target.parentElement.parentElement.parentElement;
      const index = node.dataset.index;
      if (node.classList.contains("today")) {
        todoArrayFunctions.removeTodo(0, index);
      } else if (node.classList.contains("upcoming")) {
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
    sideBar.classList.toggle("side-bar-hide");
  }

  let todoToEdit;
  let todoToEditArray;
  let todoToEditIndex;
  let todoToEditNode;

  function toggleEditTodoForm(e) {
    if (e.target.classList.contains("fa-pen-to-square")) {
      toggleTodoForm("Edit Todo");
      const node = e.target.parentElement.parentElement.parentElement;
      node.classList.toggle("hide");
      const index = node.dataset.index;
      todoToEditIndex = index;
      todoToEditNode = node;
      if (node.classList.contains("today")) {
        todoToEdit = todoArrayFunctions.findTodo(0, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
        todoToEditArray = 0;
      } else if (node.classList.contains("upcoming")) {
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
    todoArrayFunctions.addTodo(
      todoTitleInput.value,
      todoDescriptionInput.value,
      todoDueDateInput.value,
      todoPriorityInput.value,
      projectSelect.value
    );
    toggleTodoForm();
    displayTodoList();
    todoArrayFunctions.todoListCounter();
  }

  const burgerMenu = document.querySelectorAll(".burger-menu");

  function clearStorage() {
    localStorage.clear();
    location.reload();
  }

  function displayNumberOfTodos(listType, counter) {
    document.querySelector(`span[data-index="${listType}"]`).textContent =
      counter;
  }

  const clearStorageButton = document.querySelector("#clear-storage-button");

  function eventListeners() {
    addTodoFormButton.addEventListener("click", () =>
      toggleTodoForm("Add Todo")
    );
    cancelTodoForm.addEventListener("click", toggleTodoForm);
    addProjectsFormButton.addEventListener("click", toggleProjectForm);
    cancelProjectsButton.addEventListener("click", toggleProjectForm);
    addTodoButton.addEventListener("click", () => {
      if (addTodoButton.textContent == "Add Todo") {
        todoArrayFunctions.addTodo(
          todoTitleInput.value,
          todoDescriptionInput.value,
          todoDueDateInput.value,
          todoPriorityInput.value,
          projectSelect.value
        );
        toggleTodoForm();
        displayTodoList();
        todoArrayFunctions.todoListCounter();
      } else {
        clickEditTodo();
      }
    });
    addProjectsButton.addEventListener("click", () => {
      const value = addProjectsInput.value;
      const newValue = value.replaceAll(/\s/g, "-");
      console.log(value);
      todoArrayFunctions.addProject(newValue);
      displayProject(newValue);
      toggleProjectForm();
      todoArrayFunctions.todoListCounter();
    });
    sideBar.addEventListener("click", (e) => switchTodoListType(e));
    document.addEventListener("click", checkCompleteTodo);
    document.addEventListener("click", clickRemoveTodo);
    document.addEventListener("click", toggleEditTodoForm);
    burgerMenu.forEach((menu) => menu.addEventListener("click", toggleSideBar));
    clearStorageButton.addEventListener("click", clearStorage);
  }

  return {
    eventListeners,
    displayTodoList,
    displayNumberOfTodos,
    displayProject,
    displayTodo,
  };
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
    if (
      localStorage.key(i) !== "todoListCompleted" &&
      localStorage.key(i) !== "todoListArrayToday" &&
      localStorage.key(i) !== "todoListArrayUpcoming"
    ) {
      todoArrayFunctions.addProject(localStorage.key(i));
      ui.displayProject(localStorage.key(i));
      todoArrayFunctions.todoListCounter();
      const key = localStorage.key(i);
      todoArrayFunctions.todoListArray.forEach((item) => {
        if (item[0] == key) {
          item.push(JSON.parse(localStorage.getItem(localStorage.key(i)))[1]);
          todoArrayFunctions.todoListCounter();
          console.log(todoArrayFunctions.todoListArray);
          ui.displayTodo(
            JSON.parse(localStorage.getItem(localStorage.key(i)))[1],
            0
          );
        }
      });
    }
  }
}

// Shit code above to try and retrieve projects from localstorage, display project and corresponding todos

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG1CQUFtQix1QkFBdUIsMkNBQTJDLHNCQUFzQix5Q0FBeUMsK0JBQStCLDBCQUEwQiwrQkFBK0IsMkJBQTJCLCtCQUErQiw4QkFBOEIsdUNBQXVDLDhCQUE4Qix1Q0FBdUMsK0JBQStCLHVDQUF1QyxrQ0FBa0MscUNBQXFDLDZCQUE2QixxQ0FBcUMsOEJBQThCLHFDQUFxQyxpQ0FBaUMsZ0RBQWdELDRCQUE0QixpRUFBaUUsZ0NBQWdDLDhEQUE4RCwrQkFBK0IsZ0JBQWdCLG1DQUFtQywrRUFBK0UsaUZBQWlGLDZEQUE2RCw4RUFBOEUsNEVBQTRFLHNEQUFzRCxzREFBc0QsK0JBQStCLDZDQUE2QyxzQkFBc0IsWUFBWSxNQUFNLFlBQW1CLGlEQUFpRDs7Ozs7O1VDQXgyTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04wRDtBQUNkOztBQUU1QyxXQUFXLHlEQUFXO0FBQ3RCLDJCQUEyQix1RUFBa0I7O0FBRTdDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG9BcnJheUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVUlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGVmb3JtYXQvbGliL2RhdGVmb3JtYXQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5pbXBvcnQgeyBVSUZ1bmN0aW9ucyB9IGZyb20gXCIuL1VJRnVuY3Rpb25zXCI7XG5cbmNvbnN0IHVpID0gVUlGdW5jdGlvbnMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFRvZG9BcnJheUZ1bmN0aW9ucygpIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgdG9kYXkgPSBkYXRlRm9ybWF0KG5vdywgXCJ5eXl5LW1tLWRkXCIpO1xuICBjb25zdCBuZXh0RGF5ID0gbmV3IERhdGUobm93KTtcbiAgbmV4dERheS5zZXREYXRlKG5vdy5nZXREYXRlKCkgKyAxKTtcbiAgY29uc3QgdG9tb3Jyb3cgPSBkYXRlRm9ybWF0KG5leHREYXksIFwieXl5eS1tbS1kZFwiKTtcblxuICBsZXQgdG9kb0xpc3RBcnJheVRvZGF5O1xuICBsZXQgdG9kb0xpc3RBcnJheVVwY29taW5nO1xuICBsZXQgdG9kb0xpc3RDb21wbGV0ZWQ7XG4gIGNvbnN0IHRvZG9MaXN0QXJyYXkgPSBbXTtcblxuICAvLyBTaGl0IGNvZGUgYmVsb3cgdG8gdHJ5IGFuZCBhY2Nlc3MgdG9kb3Mgb24gbG9jYWwgc3RvcmFnZSBvciBsb2FkIGluIGV4YW1wbGUgdG9kb3NcblxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdEFycmF5VG9kYXlcIikpIHtcbiAgICB0b2RvTGlzdEFycmF5VG9kYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9kb0xpc3RBcnJheVRvZGF5XCIpKTtcbiAgICB0b2RvTGlzdEFycmF5VXBjb21pbmcgPSBKU09OLnBhcnNlKFxuICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvTGlzdEFycmF5VXBjb21pbmdcIilcbiAgICApO1xuICAgIHRvZG9MaXN0Q29tcGxldGVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9MaXN0Q29tcGxldGVkXCIpKTtcbiAgfSBlbHNlIHtcbiAgICB0b2RvTGlzdEFycmF5VG9kYXkgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcIlRhc2sgZm9yIHRvZGF5XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcInNvbWV0aGluZyBoZXJlXCIsXG4gICAgICAgIHByaW9yaXR5OiBcIm1lZGl1bVwiLFxuICAgICAgICBkdWVEYXRlOiB0b2RheSxcbiAgICAgICAgcHJvamVjdDogXCJJbmJveFwiLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdO1xuICAgIHRvZG9MaXN0QXJyYXlVcGNvbWluZyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IFwiVGFzayBmb3IgdG9tb3Jyb3dcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwic29tZXRoaW5nIGhlcmVcIixcbiAgICAgICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gICAgICAgIGR1ZURhdGU6IHRvbW9ycm93LFxuICAgICAgICBwcm9qZWN0OiBcIkluYm94XCIsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogXCJUYXNrIGZvciBuZXh0IHdlZWtcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwic29tZXRoaW5nIGhlcmVcIixcbiAgICAgICAgcHJpb3JpdHk6IFwibWVkaXVtXCIsXG4gICAgICAgIGR1ZURhdGU6IFwiMjAyMy0wOS0yNVwiLFxuICAgICAgICBwcm9qZWN0OiBcIkluYm94XCIsXG4gICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgdG9kb0xpc3RDb21wbGV0ZWQgPSBbXTtcbiAgfVxuXG4gIHRvZG9MaXN0QXJyYXkucHVzaCh0b2RvTGlzdEFycmF5VG9kYXkpO1xuICB0b2RvTGlzdEFycmF5LnB1c2godG9kb0xpc3RBcnJheVVwY29taW5nKTtcbiAgdG9kb0xpc3RBcnJheS5wdXNoKHRvZG9MaXN0Q29tcGxldGVkKTtcblxuICAvLyBTaGl0IGNvZGUgYWJvdmUgdG8gdHJ5IGFuZCBhY2Nlc3MgdG9kb3Mgb24gbG9jYWwgc3RvcmFnZSBvciBsb2FkIGluIGV4YW1wbGUgdG9kb3NcblxuICBjb25zdCBDcmVhdGVUb2RvID0gZnVuY3Rpb24gKFxuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGR1ZURhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgcHJvamVjdCxcbiAgICBjb21wbGV0ZWRcbiAgKSB7XG4gICAgY29uc3QgdG9kbyA9IHt9O1xuICAgIHRvZG8udGl0bGUgPSB0aXRsZTtcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdG9kby5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0b2RvLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdG9kby5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0b2RvLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgICByZXR1cm4gdG9kbztcbiAgfTtcblxuICBmdW5jdGlvbiBhZGRUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICBjb25zdCBuZXdUb2RvID0gQ3JlYXRlVG9kbyhcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBwcm9qZWN0LFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgPT0gdG9kYXkgJiYgbmV3VG9kby5wcm9qZWN0ID09IFwiSW5ib3hcIilcbiAgICAgIHRvZG9MaXN0QXJyYXlUb2RheS5wdXNoKG5ld1RvZG8pO1xuICAgIGlmIChuZXdUb2RvLmR1ZURhdGUgIT09IHRvZGF5ICYmIG5ld1RvZG8ucHJvamVjdCA9PSBcIkluYm94XCIpXG4gICAgICB0b2RvTGlzdEFycmF5VXBjb21pbmcucHVzaChuZXdUb2RvKTtcbiAgICBpZiAobmV3VG9kby5wcm9qZWN0ICE9PSBcIkluYm94XCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgdG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodG9kb0xpc3RBcnJheVtpXVswXSA9PSBuZXdUb2RvLnByb2plY3QpIHtcbiAgICAgICAgICB0b2RvTGlzdEFycmF5W2ldLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KHZhbHVlKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IFt2YWx1ZV07XG4gICAgdG9kb0xpc3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9kb0xpc3RDb3VudGVyKCkge1xuICAgIGxldCBpbmJveENvdW50ZXIgPSAwO1xuICAgIGxldCB0b2RheUNvdW50ZXIgPSAwO1xuICAgIGxldCB1cGNvbWluZ0NvdW50ZXIgPSAwO1xuICAgIGxldCBjb21wbGV0ZWRDb3VudGVyID0gMDtcblxuICAgIHRvZG9MaXN0QXJyYXkuZm9yRWFjaCgoYXJyYXkpID0+XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSBcIm9iamVjdFwiICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKSB7XG4gICAgICAgICAgaW5ib3hDb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB1aS5kaXNwbGF5TnVtYmVyT2ZUb2RvcyhcIkluYm94XCIsIGluYm94Q291bnRlcik7XG5cbiAgICB0b2RvTGlzdEFycmF5LmZvckVhY2goKGFycmF5KSA9PlxuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXRlbS5kdWVEYXRlID09IHRvZGF5ICYmXG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgIGl0ZW0uY29tcGxldGVkID09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICB0b2RheUNvdW50ZXIrKztcbiAgICAgIH0pXG4gICAgKTtcbiAgICB1aS5kaXNwbGF5TnVtYmVyT2ZUb2RvcyhcIlRvZGF5XCIsIHRvZGF5Q291bnRlcik7XG5cbiAgICB0b2RvTGlzdEFycmF5LmZvckVhY2goKGFycmF5KSA9PlxuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXRlbS5kdWVEYXRlICE9PSB0b2RheSAmJlxuICAgICAgICAgIHR5cGVvZiBpdGVtID09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICBpdGVtLmNvbXBsZXRlZCA9PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgdXBjb21pbmdDb3VudGVyKys7XG4gICAgICB9KVxuICAgICk7XG4gICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MoXCJVcGNvbWluZ1wiLCB1cGNvbWluZ0NvdW50ZXIpO1xuXG4gICAgdG9kb0xpc3RDb21wbGV0ZWQuZm9yRWFjaCgoKSA9PiBjb21wbGV0ZWRDb3VudGVyKyspO1xuICAgIHVpLmRpc3BsYXlOdW1iZXJPZlRvZG9zKFwiQ29tcGxldGVkXCIsIGNvbXBsZXRlZENvdW50ZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDM7IGkgPCB0b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICB0b2RvTGlzdEFycmF5W2ldLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGV0IHByb2plY3QgPSB0b2RvTGlzdEFycmF5W2ldWzBdO1xuICAgICAgdWkuZGlzcGxheU51bWJlck9mVG9kb3MocHJvamVjdCwgY291bnRlcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVG9kbyhhcnJheSwgaW5kZXgpIHtcbiAgICB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGxldGVUb2RvKGFycmF5LCBpbmRleCkge1xuICAgIHRvZG9MaXN0QXJyYXlbYXJyYXldW2luZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRvZG8gPSB0b2RvTGlzdEFycmF5W2FycmF5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRvZG9MaXN0Q29tcGxldGVkLnB1c2goY29tcGxldGVkVG9kb1swXSk7XG4gICAgY29uc29sZS5sb2codG9kb0xpc3RBcnJheSk7XG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kVG9kbyhhcnJheSwgaW5kZXgpIHtcbiAgICByZXR1cm4gdG9kb0xpc3RBcnJheVthcnJheV1baW5kZXhdO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgXCJ0b2RvTGlzdEFycmF5VG9kYXlcIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KHRvZG9MaXN0QXJyYXlUb2RheSlcbiAgICApO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgXCJ0b2RvTGlzdEFycmF5VXBjb21pbmdcIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KHRvZG9MaXN0QXJyYXlVcGNvbWluZylcbiAgICApO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgXCJ0b2RvTGlzdENvbXBsZXRlZFwiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkodG9kb0xpc3RDb21wbGV0ZWQpXG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAzOyBpIDwgdG9kb0xpc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgIHRvZG9MaXN0QXJyYXlbaV1bMF0sXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHRvZG9MaXN0QXJyYXlbaV0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkVG9kbyxcbiAgICBhZGRQcm9qZWN0LFxuICAgIHRvZG9MaXN0Q291bnRlcixcbiAgICByZW1vdmVUb2RvLFxuICAgIGNvbXBsZXRlVG9kbyxcbiAgICBmaW5kVG9kbyxcbiAgICB0b2RvTGlzdEFycmF5LFxuICAgIHRvZG9MaXN0Q29tcGxldGVkLFxuICAgIHRvZGF5LFxuICAgIHRvbW9ycm93LFxuICAgIG5leHREYXksXG4gICAgbm93LFxuICB9O1xufVxuIiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSBcImRhdGVmb3JtYXRcIjtcbmltcG9ydCB7IFRvZG9BcnJheUZ1bmN0aW9ucyB9IGZyb20gXCIuL1RvZG9BcnJheUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB0b2RvQXJyYXlGdW5jdGlvbnMgPSBUb2RvQXJyYXlGdW5jdGlvbnMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIFVJRnVuY3Rpb25zKCkge1xuICBsZXQgY3VycmVudFBhZ2UgPSBcIkluYm94XCI7XG5cbiAgY29uc3QgYWRkVG9kb0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgY2FuY2VsVG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbC1mb3JtXCIpO1xuICBjb25zdCBhZGRUb2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8tZm9ybVwiKTtcblxuICBmdW5jdGlvbiB0b2dnbGVUb2RvRm9ybSh0ZXh0KSB7XG4gICAgaWYgKHRvZG9Ub0VkaXROb2RlKSB0b2RvVG9FZGl0Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICBhZGRUb2RvRm9ybUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICBjb25zdCBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdG9kby1idXR0b25cIik7XG4gICAgYWRkVG9kb0J1dHRvbi50ZXh0Q29udGVudCA9IGAke3RleHR9YDtcbiAgICBjbGVhclRvZG9Gb3JtKCk7XG4gIH1cblxuICBjb25zdCBhZGRQcm9qZWN0c0Zvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLmFkZC1wcm9qZWN0cy1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBjYW5jZWxQcm9qZWN0c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIjY2FuY2VsLXByb2plY3QtZm9ybS1idXR0b25cIlxuICApO1xuICBjb25zdCBhZGRQcm9qZWN0c0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0cy1mb3JtXCIpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZVByb2plY3RGb3JtKCkge1xuICAgIGFkZFByb2plY3RzRm9ybS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICBhZGRQcm9qZWN0c0Zvcm1CdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG4gICAgY2xlYXJQcm9qZWN0c0Zvcm0oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHRpdGxlKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSB0aXRsZTtcbiAgICBvcHRpb24uaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIGNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcC5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIGNvbnN0IHByb2plY3RUcmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiKTtcbiAgICBwcm9qZWN0VHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1kaWFncmFtLXByb2plY3RcIik7XG4gICAgcC5pbm5lckhUTUwgPSBgJHt0aXRsZX0gLSA8c3BhbiBkYXRhLWluZGV4PVwiJHt0aXRsZX1cIj48L3NwYW4+YDtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwibmF2LWl0ZW1cIik7XG4gICAgZGl2LmFwcGVuZENoaWxkKHByb2plY3RUcmFzaEljb24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHAuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCB0aXRsZSk7XG4gICAgcHJvamVjdFRyYXNoSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIHRpdGxlKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCB0aXRsZSk7XG4gIH1cblxuICBjb25zdCBhZGRQcm9qZWN0c0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtcHJvamVjdHMtaW5wdXRcIik7XG4gIGNvbnN0IHRvZG9UaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RvLXRpdGxlLWlucHV0XCIpO1xuICBjb25zdCB0b2RvRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIjdG9kby1kZXNjcmlwdGlvbi1pbnB1dFwiXG4gICk7XG4gIGNvbnN0IHRvZG9EdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZG8tZHVlLWRhdGUtaW5wdXRcIik7XG4gIGNvbnN0IHRvZG9Qcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RvLXByaW9yaXR5LWlucHV0XCIpO1xuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdFwiKTtcbiAgY29uc3QgYWRkUHJvamVjdHNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0cy1idXR0b25cIik7XG4gIGNvbnN0IGFkZFRvZG9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10b2RvLWJ1dHRvblwiKTtcblxuICBmdW5jdGlvbiBjbGVhclByb2plY3RzRm9ybSgpIHtcbiAgICBhZGRQcm9qZWN0c0lucHV0LnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVG9kb0Zvcm0oKSB7XG4gICAgdG9kb1RpdGxlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gXCJcIjtcbiAgICB0b2RvRHVlRGF0ZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICB0b2RvUHJpb3JpdHlJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xuXG4gIGZ1bmN0aW9uIGRpc3BsYXlUb2RvTGlzdCgpIHtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGlmIChjdXJyZW50UGFnZSA9PSBcIkluYm94XCIpIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5LmZvckVhY2goKGFycmF5KSA9PlxuICAgICAgICBhcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSBcIm9iamVjdFwiICYmIGl0ZW0uY29tcGxldGVkID09IGZhbHNlKVxuICAgICAgICAgICAgZGlzcGxheVRvZG8oaXRlbSwgaW5kZXgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09IFwiVG9kYXlcIikge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0QXJyYXkuZm9yRWFjaCgoYXJyYXkpID0+XG4gICAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaXRlbS5kdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSAmJlxuICAgICAgICAgICAgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICAgICBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT0gXCJVcGNvbWluZ1wiKSB7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKChhcnJheSkgPT5cbiAgICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBpdGVtLmR1ZURhdGUgIT09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSAmJlxuICAgICAgICAgICAgdHlwZW9mIGl0ZW0gPT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGRpc3BsYXlUb2RvKGl0ZW0sIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT0gXCJDb21wbGV0ZWRcIikge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q29tcGxldGVkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgICBkaXNwbGF5VG9kbyhpdGVtLCBpbmRleClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5LmZvckVhY2goKGFycmF5KSA9PlxuICAgICAgICBhcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGl0ZW0ucHJvamVjdCA9PSBjdXJyZW50UGFnZSAmJlxuICAgICAgICAgICAgdHlwZW9mIGl0ZW0gPT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaXRlbS5jb21wbGV0ZWQgPT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGRpc3BsYXlUb2RvKGl0ZW0sIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlUb2RvKHRvZG8sIGluZGV4KSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBpbmRleCk7XG5cbiAgICBpZiAodG9kby5kdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSAmJiB0b2RvLnByb2plY3QgPT0gXCJJbmJveFwiKVxuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RheVwiKTtcbiAgICBpZiAodG9kby5kdWVEYXRlICE9PSB0b2RvQXJyYXlGdW5jdGlvbnMudG9kYXkgJiYgdG9kby5wcm9qZWN0ID09IFwiSW5ib3hcIilcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidXBjb21pbmdcIik7XG4gICAgaWYgKHRvZG8ucHJvamVjdCAhPT0gXCJJbmJveFwiKSBjb250YWluZXIuY2xhc3NMaXN0LmFkZCh0b2RvLnByb2plY3QpO1xuXG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZChcInRvZG8tdGl0bGVcIik7XG4gICAgY29uc3QgdG9kb1RpdGxlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgICB0b2RvVGl0bGVUZXh0LnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcbiAgICBjb25zdCB0b2RvQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdG9kb0NoZWNrQm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICB0b2RvQ2hlY2tCb3guY2xhc3NMaXN0LmFkZChcImNoZWNrLWJveFwiKTtcbiAgICBjb25zdCB0b2RvVGl0bGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvVGl0bGVXcmFwcGVyLnN0eWxlLmNzc1RleHQgPVxuICAgICAgXCJkaXNwbGF5OiBmbGV4OyBnYXA6IDFyZW07IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI7XG4gICAgdG9kb1RpdGxlV3JhcHBlci5hcHBlbmRDaGlsZCh0b2RvQ2hlY2tCb3gpO1xuICAgIHRvZG9UaXRsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb1RpdGxlVGV4dCk7XG4gICAgdG9kb1RpdGxlLmFwcGVuZENoaWxkKHRvZG9UaXRsZVdyYXBwZXIpO1xuICAgIGNvbnN0IHRvZG9UaXRsZUljb25XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvVGl0bGVJY29uV3JhcHBlci5zdHlsZS5jc3NUZXh0ID0gXCJkaXNwbGF5OiBmbGV4OyBnYXA6IDJyZW07XCI7XG4gICAgY29uc3QgdG9kb0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgdG9kb0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiKTtcbiAgICB0b2RvRWRpdEljb24uY2xhc3NMaXN0LmFkZChcImZhLXBlbi10by1zcXVhcmVcIik7XG4gICAgY29uc3QgdG9kb1RyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIHRvZG9UcmFzaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIpO1xuICAgIHRvZG9UcmFzaEljb24uY2xhc3NMaXN0LmFkZChcImZhLXRyYXNoXCIpO1xuICAgIHRvZG9UaXRsZUljb25XcmFwcGVyLmFwcGVuZENoaWxkKHRvZG9FZGl0SWNvbik7XG4gICAgdG9kb1RpdGxlSWNvbldyYXBwZXIuYXBwZW5kQ2hpbGQodG9kb1RyYXNoSWNvbik7XG4gICAgdG9kb1RpdGxlLmFwcGVuZENoaWxkKHRvZG9UaXRsZUljb25XcmFwcGVyKTtcblxuICAgIGNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG9Qcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwidG9kby1wcmlvcml0eVwiKTtcblxuICAgIGlmICh0b2RvLnByaW9yaXR5ID09IFwibG93XCIgfHwgdG9kby5wcmlvcml0eSA9PSBcIlwiKSB7XG4gICAgICB0b2RvUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgICAgdG9kb1ByaW9yaXR5LnRleHRDb250ZW50ID0gXCJMb3cgUHJpb3JpdHlcIjtcbiAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT0gXCJtZWRpdW1cIikge1xuICAgICAgdG9kb1ByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwib3JhbmdlXCI7XG4gICAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSBcIk1lZGl1bSBQcmlvcml0eVwiO1xuICAgIH0gZWxzZSBpZiAodG9kby5wcmlvcml0eSA9PSBcImhpZ2hcIikge1xuICAgICAgdG9kb1ByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSBcIkhpZ2ggUHJpb3JpdHlcIjtcbiAgICB9XG4gICAgY29uc3QgcHJpb3JpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXByaW9yaXR5XCIpO1xuICAgIHByaW9yaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWNvbnRhaW5lcnNcIik7XG4gICAgcHJpb3JpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb1ByaW9yaXR5KTtcblxuICAgIGNvbnN0IHRvZG9EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdG9kb0R1ZURhdGUudGV4dENvbnRlbnQgPSBjYWxjdWxhdGVSZW1haW5pbmdEYXlzKHRvZG8uZHVlRGF0ZSk7XG4gICAgdG9kb0R1ZURhdGUuc3R5bGUuY3NzVGV4dCA9IFwibWFyZ2luOiAwO1wiO1xuXG4gICAgY29uc3QgZHVlRGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZHVlRGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kby1kdWUtZGF0ZVwiKTtcbiAgICBkdWVEYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWNvbnRhaW5lcnNcIik7XG4gICAgZHVlRGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRHVlRGF0ZSk7XG5cbiAgICBjb25zdCBmbGV4RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmbGV4RGl2LnN0eWxlLmNzc1RleHQgPSBcImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMnJlbTtcIjtcbiAgICBmbGV4RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5Q29udGFpbmVyKTtcbiAgICBmbGV4RGl2LmFwcGVuZENoaWxkKGR1ZURhdGVDb250YWluZXIpO1xuICAgIGlmICh0b2RvLnByb2plY3QgIT09IFwiSW5ib3hcIikge1xuICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXByb2plY3RcIik7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWNvbnRhaW5lcnNcIik7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IHRvZG8ucHJvamVjdDtcbiAgICAgIGZsZXhEaXYuYXBwZW5kQ2hpbGQocHJvamVjdENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKHRvZG8uY29tcGxldGVkID09IHRydWUpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibGluZS10aHJvdWdoXCIpO1xuICAgICAgdG9kb1RyYXNoSWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0b2RvQ2hlY2tCb3guY2hlY2tlZCA9IHRydWU7XG4gICAgICB0b2RvQ2hlY2tCb3guZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvRGVzY3JpcHRpb24pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmbGV4RGl2KTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRvZG9cIik7XG4gICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVJlbWFpbmluZ0RheXMoZHVlRGF0ZSkge1xuICAgIGlmIChkdWVEYXRlID09IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RheSkge1xuICAgICAgcmV0dXJuIGBEdWUgdG9kYXkhYDtcbiAgICB9IGVsc2UgaWYgKGR1ZURhdGUgPT0gdG9kb0FycmF5RnVuY3Rpb25zLnRvbW9ycm93KSB7XG4gICAgICByZXR1cm4gYER1ZSB0b21vcnJvdyFgO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5uZXh0RGF5LnNldERhdGUoXG4gICAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLm5vdy5nZXREYXRlKCkgKyBpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkdWVEYXRlID09IGRhdGVGb3JtYXQodG9kb0FycmF5RnVuY3Rpb25zLm5leHREYXksIFwieXl5eS1tbS1kZFwiKSkge1xuICAgICAgICAgIHJldHVybiBgRHVlIGluICR7aX0gZGF5c2A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLWJhclwiKTtcblxuICBmdW5jdGlvbiBzd2l0Y2hUb2RvTGlzdFR5cGUoZSkge1xuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgIGlmIChcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5hdi1pdGVtXCIpIHx8XG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm5hdi1pdGVtXCIpIHx8XG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmF2LWl0ZW1cIilcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkLXByb2plY3RzLWNvbnRhaW5lclwiKSB8fFxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFkZC1wcm9qZWN0cy1jb250YWluZXJcIilcbiAgICAgIClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgY29uc3QgdG9kb0xpc3RUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtdHlwZVwiKTtcbiAgICAgIHRvZG9MaXN0VHlwZS5pbm5lckhUTUwgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgY3VycmVudFBhZ2UgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgICB0b2dnbGVTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tDb21wbGV0ZVRvZG8oZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGVjay1ib3hcIikpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGluZGV4ID0gbm9kZS5kYXRhc2V0LmluZGV4O1xuICAgICAgY29uc29sZS5sb2coeyBub2RlLCBpbmRleCB9KTtcbiAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChcImxpbmUtdGhyb3VnaFwiKTtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcInRvZGF5XCIpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oMCwgaW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcInVwY29taW5nXCIpKSB7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oMSwgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5vZGUuY2xhc3NMaXN0WzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5W2ldWzBdID09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5jb21wbGV0ZVRvZG8oaSwgaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RDb3VudGVyKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGlja1JlbW92ZVRvZG8oZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmYS10cmFzaFwiKSkge1xuICAgICAgY29uc3Qgbm9kZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgaW5kZXggPSBub2RlLmRhdGFzZXQuaW5kZXg7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2RheVwiKSkge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMucmVtb3ZlVG9kbygwLCBpbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwidXBjb21pbmdcIikpIHtcbiAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnJlbW92ZVRvZG8oMSwgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5vZGUuY2xhc3NMaXN0WzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5W2ldWzBdID09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5yZW1vdmVUb2RvKGksIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRpc3BsYXlUb2RvTGlzdCgpO1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVNpZGVCYXIoKSB7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QudG9nZ2xlKFwic2lkZS1iYXItaGlkZVwiKTtcbiAgfVxuXG4gIGxldCB0b2RvVG9FZGl0O1xuICBsZXQgdG9kb1RvRWRpdEFycmF5O1xuICBsZXQgdG9kb1RvRWRpdEluZGV4O1xuICBsZXQgdG9kb1RvRWRpdE5vZGU7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlRWRpdFRvZG9Gb3JtKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtcGVuLXRvLXNxdWFyZVwiKSkge1xuICAgICAgdG9nZ2xlVG9kb0Zvcm0oXCJFZGl0IFRvZG9cIik7XG4gICAgICBjb25zdCBub2RlID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBub2RlLmRhdGFzZXQuaW5kZXg7XG4gICAgICB0b2RvVG9FZGl0SW5kZXggPSBpbmRleDtcbiAgICAgIHRvZG9Ub0VkaXROb2RlID0gbm9kZTtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcInRvZGF5XCIpKSB7XG4gICAgICAgIHRvZG9Ub0VkaXQgPSB0b2RvQXJyYXlGdW5jdGlvbnMuZmluZFRvZG8oMCwgaW5kZXgpO1xuICAgICAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQudGl0bGU7XG4gICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnByaW9yaXR5O1xuICAgICAgICB0b2RvVG9FZGl0QXJyYXkgPSAwO1xuICAgICAgfSBlbHNlIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcInVwY29taW5nXCIpKSB7XG4gICAgICAgIHRvZG9Ub0VkaXQgPSB0b2RvQXJyYXlGdW5jdGlvbnMuZmluZFRvZG8oMSwgaW5kZXgpO1xuICAgICAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQudGl0bGU7XG4gICAgICAgIHRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnByaW9yaXR5O1xuICAgICAgICB0b2RvVG9FZGl0QXJyYXkgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5vZGUuY2xhc3NMaXN0WzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMjsgaSA8IHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5W2ldWzBdID09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHRvZG9Ub0VkaXQgPSB0b2RvQXJyYXlGdW5jdGlvbnMuZmluZFRvZG8oaSwgaW5kZXgpO1xuICAgICAgICAgICAgdG9kb1RpdGxlSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LnRpdGxlO1xuICAgICAgICAgICAgdG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0b2RvVG9FZGl0LmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC52YWx1ZSA9IHRvZG9Ub0VkaXQuZHVlRGF0ZTtcbiAgICAgICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlID0gdG9kb1RvRWRpdC5wcmlvcml0eTtcbiAgICAgICAgICAgIHByb2plY3RTZWxlY3QudmFsdWUgPSB0b2RvVG9FZGl0LnByb2plY3Q7XG4gICAgICAgICAgICB0b2RvVG9FZGl0QXJyYXkgPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrRWRpdFRvZG8oKSB7XG4gICAgdG9kb0FycmF5RnVuY3Rpb25zLnJlbW92ZVRvZG8odG9kb1RvRWRpdEFycmF5LCB0b2RvVG9FZGl0SW5kZXgpO1xuICAgIHRvZG9BcnJheUZ1bmN0aW9ucy5hZGRUb2RvKFxuICAgICAgdG9kb1RpdGxlSW5wdXQudmFsdWUsXG4gICAgICB0b2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcbiAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUsXG4gICAgICB0b2RvUHJpb3JpdHlJbnB1dC52YWx1ZSxcbiAgICAgIHByb2plY3RTZWxlY3QudmFsdWVcbiAgICApO1xuICAgIHRvZ2dsZVRvZG9Gb3JtKCk7XG4gICAgZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuICB9XG5cbiAgY29uc3QgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnVyZ2VyLW1lbnVcIik7XG5cbiAgZnVuY3Rpb24gY2xlYXJTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheU51bWJlck9mVG9kb3MobGlzdFR5cGUsIGNvdW50ZXIpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzcGFuW2RhdGEtaW5kZXg9XCIke2xpc3RUeXBlfVwiXWApLnRleHRDb250ZW50ID1cbiAgICAgIGNvdW50ZXI7XG4gIH1cblxuICBjb25zdCBjbGVhclN0b3JhZ2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsZWFyLXN0b3JhZ2UtYnV0dG9uXCIpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGFkZFRvZG9Gb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdG9nZ2xlVG9kb0Zvcm0oXCJBZGQgVG9kb1wiKVxuICAgICk7XG4gICAgY2FuY2VsVG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRvZG9Gb3JtKTtcbiAgICBhZGRQcm9qZWN0c0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVByb2plY3RGb3JtKTtcbiAgICBjYW5jZWxQcm9qZWN0c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlUHJvamVjdEZvcm0pO1xuICAgIGFkZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChhZGRUb2RvQnV0dG9uLnRleHRDb250ZW50ID09IFwiQWRkIFRvZG9cIikge1xuICAgICAgICB0b2RvQXJyYXlGdW5jdGlvbnMuYWRkVG9kbyhcbiAgICAgICAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSxcbiAgICAgICAgICB0b2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcbiAgICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnZhbHVlLFxuICAgICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlLFxuICAgICAgICAgIHByb2plY3RTZWxlY3QudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgdG9nZ2xlVG9kb0Zvcm0oKTtcbiAgICAgICAgZGlzcGxheVRvZG9MaXN0KCk7XG4gICAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsaWNrRWRpdFRvZG8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhZGRQcm9qZWN0c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBhZGRQcm9qZWN0c0lucHV0LnZhbHVlO1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZS5yZXBsYWNlQWxsKC9cXHMvZywgXCItXCIpO1xuICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmFkZFByb2plY3QobmV3VmFsdWUpO1xuICAgICAgZGlzcGxheVByb2plY3QobmV3VmFsdWUpO1xuICAgICAgdG9nZ2xlUHJvamVjdEZvcm0oKTtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICB9KTtcbiAgICBzaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gc3dpdGNoVG9kb0xpc3RUeXBlKGUpKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hlY2tDb21wbGV0ZVRvZG8pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja1JlbW92ZVRvZG8pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVFZGl0VG9kb0Zvcm0pO1xuICAgIGJ1cmdlck1lbnUuZm9yRWFjaCgobWVudSkgPT4gbWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlU2lkZUJhcikpO1xuICAgIGNsZWFyU3RvcmFnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xlYXJTdG9yYWdlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXZlbnRMaXN0ZW5lcnMsXG4gICAgZGlzcGxheVRvZG9MaXN0LFxuICAgIGRpc3BsYXlOdW1iZXJPZlRvZG9zLFxuICAgIGRpc3BsYXlQcm9qZWN0LFxuICAgIGRpc3BsYXlUb2RvLFxuICB9O1xufVxuIiwidmFyIHRva2VuPS9kezEsNH18RHszLDR9fG17MSw0fXx5eSg/Onl5KT98KFtIaE1zVHRdKVxcMT98V3sxLDJ9fFtMbG9wU1pOXXxcIlteXCJdKlwifCdbXiddKicvZzt2YXIgdGltZXpvbmU9L1xcYig/OltBLVpdezEsM31bQS1aXVtUQ10pKD86Wy0rXVxcZHs0fSk/fCgoPzpBdXN0cmFsaWFuICk/KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWUpXFxiL2c7dmFyIHRpbWV6b25lQ2xpcD0vW14tK1xcZEEtWl0vZztleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRlRm9ybWF0KGRhdGUsbWFzayx1dGMsZ210KXtpZihhcmd1bWVudHMubGVuZ3RoPT09MSYmdHlwZW9mIGRhdGU9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKG1hc2tzW21hc2tdfHxtYXNrfHxtYXNrc1tcImRlZmF1bHRcIl0pO3ZhciBtYXNrU2xpY2U9bWFzay5zbGljZSgwLDQpO2lmKG1hc2tTbGljZT09PVwiVVRDOlwifHxtYXNrU2xpY2U9PT1cIkdNVDpcIil7bWFzaz1tYXNrLnNsaWNlKDQpO3V0Yz10cnVlO2lmKG1hc2tTbGljZT09PVwiR01UOlwiKXtnbXQ9dHJ1ZX19dmFyIF89ZnVuY3Rpb24gXygpe3JldHVybiB1dGM/XCJnZXRVVENcIjpcImdldFwifTt2YXIgX2Q9ZnVuY3Rpb24gZCgpe3JldHVybiBkYXRlW18oKStcIkRhdGVcIl0oKX07dmFyIEQ9ZnVuY3Rpb24gRCgpe3JldHVybiBkYXRlW18oKStcIkRheVwiXSgpfTt2YXIgX209ZnVuY3Rpb24gbSgpe3JldHVybiBkYXRlW18oKStcIk1vbnRoXCJdKCl9O3ZhciB5PWZ1bmN0aW9uIHkoKXtyZXR1cm4gZGF0ZVtfKCkrXCJGdWxsWWVhclwiXSgpfTt2YXIgX0g9ZnVuY3Rpb24gSCgpe3JldHVybiBkYXRlW18oKStcIkhvdXJzXCJdKCl9O3ZhciBfTT1mdW5jdGlvbiBNKCl7cmV0dXJuIGRhdGVbXygpK1wiTWludXRlc1wiXSgpfTt2YXIgX3M9ZnVuY3Rpb24gcygpe3JldHVybiBkYXRlW18oKStcIlNlY29uZHNcIl0oKX07dmFyIF9MPWZ1bmN0aW9uIEwoKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaWxsaXNlY29uZHNcIl0oKX07dmFyIF9vPWZ1bmN0aW9uIG8oKXtyZXR1cm4gdXRjPzA6ZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpfTt2YXIgX1c9ZnVuY3Rpb24gVygpe3JldHVybiBnZXRXZWVrKGRhdGUpfTt2YXIgX049ZnVuY3Rpb24gTigpe3JldHVybiBnZXREYXlPZldlZWsoZGF0ZSl9O3ZhciBmbGFncz17ZDpmdW5jdGlvbiBkKCl7cmV0dXJuIF9kKCl9LGRkOmZ1bmN0aW9uIGRkKCl7cmV0dXJuIHBhZChfZCgpKX0sZGRkOmZ1bmN0aW9uIGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpXSxzaG9ydDp0cnVlfSl9LGRkZGQ6ZnVuY3Rpb24gZGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKSs3XX0sRERERDpmdW5jdGlvbiBEREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKV19LG1tbW06ZnVuY3Rpb24gbW1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKSsxMl19LHl5OmZ1bmN0aW9uIHl5KCl7cmV0dXJuIFN0cmluZyh5KCkpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uIHl5eXkoKXtyZXR1cm4gcGFkKHkoKSw0KX0saDpmdW5jdGlvbiBoKCl7cmV0dXJuIF9IKCklMTJ8fDEyfSxoaDpmdW5jdGlvbiBoaCgpe3JldHVybiBwYWQoX0goKSUxMnx8MTIpfSxIOmZ1bmN0aW9uIEgoKXtyZXR1cm4gX0goKX0sSEg6ZnVuY3Rpb24gSEgoKXtyZXR1cm4gcGFkKF9IKCkpfSxNOmZ1bmN0aW9uIE0oKXtyZXR1cm4gX00oKX0sTU06ZnVuY3Rpb24gTU0oKXtyZXR1cm4gcGFkKF9NKCkpfSxzOmZ1bmN0aW9uIHMoKXtyZXR1cm4gX3MoKX0sc3M6ZnVuY3Rpb24gc3MoKXtyZXR1cm4gcGFkKF9zKCkpfSxsOmZ1bmN0aW9uIGwoKXtyZXR1cm4gcGFkKF9MKCksMyl9LEw6ZnVuY3Rpb24gTCgpe3JldHVybiBwYWQoTWF0aC5mbG9vcihfTCgpLzEwKSl9LHQ6ZnVuY3Rpb24gdCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzBdOmkxOG4udGltZU5hbWVzWzFdfSx0dDpmdW5jdGlvbiB0dCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzJdOmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s0XTppMThuLnRpbWVOYW1lc1s1XX0sVFQ6ZnVuY3Rpb24gVFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s2XTppMThuLnRpbWVOYW1lc1s3XX0sWjpmdW5jdGlvbiBaKCl7cmV0dXJuIGdtdD9cIkdNVFwiOnV0Yz9cIlVUQ1wiOmZvcm1hdFRpbWV6b25lKGRhdGUpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9ZXhwb3J0IHZhciBtYXNrcz17ZGVmYXVsdDpcImRkZCBtbW0gZGQgeXl5eSBISDpNTTpzc1wiLHNob3J0RGF0ZTpcIm0vZC95eVwiLHBhZGRlZFNob3J0RGF0ZTpcIm1tL2RkL3l5eXlcIixtZWRpdW1EYXRlOlwibW1tIGQsIHl5eXlcIixsb25nRGF0ZTpcIm1tbW0gZCwgeXl5eVwiLGZ1bGxEYXRlOlwiZGRkZCwgbW1tbSBkLCB5eXl5XCIsc2hvcnRUaW1lOlwiaDpNTSBUVFwiLG1lZGl1bVRpbWU6XCJoOk1NOnNzIFRUXCIsbG9uZ1RpbWU6XCJoOk1NOnNzIFRUIFpcIixpc29EYXRlOlwieXl5eS1tbS1kZFwiLGlzb1RpbWU6XCJISDpNTTpzc1wiLGlzb0RhdGVUaW1lOlwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzb1wiLGlzb1V0Y0RhdGVUaW1lOlwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiLGV4cGlyZXNIZWFkZXJGb3JtYXQ6XCJkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFpcIn07ZXhwb3J0IHZhciBpMThuPXtkYXlOYW1lczpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIixcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLG1vbnRoTmFtZXM6W1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiLFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLHRpbWVOYW1lczpbXCJhXCIsXCJwXCIsXCJhbVwiLFwicG1cIixcIkFcIixcIlBcIixcIkFNXCIsXCJQTVwiXX07dmFyIHBhZD1mdW5jdGlvbiBwYWQodmFsKXt2YXIgbGVuPWFyZ3VtZW50cy5sZW5ndGg+MSYmYXJndW1lbnRzWzFdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1sxXToyO3JldHVybiBTdHJpbmcodmFsKS5wYWRTdGFydChsZW4sXCIwXCIpfTt2YXIgZ2V0RGF5TmFtZT1mdW5jdGlvbiBnZXREYXlOYW1lKF9yZWYpe3ZhciB5PV9yZWYueSxtPV9yZWYubSxkPV9yZWYuZCxfPV9yZWYuXyxkYXlOYW1lPV9yZWYuZGF5TmFtZSxfcmVmJHNob3J0PV9yZWZbXCJzaG9ydFwiXSxfc2hvcnQ9X3JlZiRzaG9ydD09PXZvaWQgMD9mYWxzZTpfcmVmJHNob3J0O3ZhciB0b2RheT1uZXcgRGF0ZTt2YXIgeWVzdGVyZGF5PW5ldyBEYXRlO3llc3RlcmRheS5zZXREYXRlKHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpLTEpO3ZhciB0b21vcnJvdz1uZXcgRGF0ZTt0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93W18rXCJEYXRlXCJdKCkrMSk7dmFyIHRvZGF5X2Q9ZnVuY3Rpb24gdG9kYXlfZCgpe3JldHVybiB0b2RheVtfK1wiRGF0ZVwiXSgpfTt2YXIgdG9kYXlfbT1mdW5jdGlvbiB0b2RheV9tKCl7cmV0dXJuIHRvZGF5W18rXCJNb250aFwiXSgpfTt2YXIgdG9kYXlfeT1mdW5jdGlvbiB0b2RheV95KCl7cmV0dXJuIHRvZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgeWVzdGVyZGF5X2Q9ZnVuY3Rpb24geWVzdGVyZGF5X2QoKXtyZXR1cm4geWVzdGVyZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfbT1mdW5jdGlvbiB5ZXN0ZXJkYXlfbSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfeT1mdW5jdGlvbiB5ZXN0ZXJkYXlfeSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB0b21vcnJvd19kPWZ1bmN0aW9uIHRvbW9ycm93X2QoKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkRhdGVcIl0oKX07dmFyIHRvbW9ycm93X209ZnVuY3Rpb24gdG9tb3Jyb3dfbSgpe3JldHVybiB0b21vcnJvd1tfK1wiTW9udGhcIl0oKX07dmFyIHRvbW9ycm93X3k9ZnVuY3Rpb24gdG9tb3Jyb3dfeSgpe3JldHVybiB0b21vcnJvd1tfK1wiRnVsbFllYXJcIl0oKX07aWYodG9kYXlfeSgpPT09eSYmdG9kYXlfbSgpPT09bSYmdG9kYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRkeVwiOlwiVG9kYXlcIn1lbHNlIGlmKHllc3RlcmRheV95KCk9PT15JiZ5ZXN0ZXJkYXlfbSgpPT09bSYmeWVzdGVyZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJZc2RcIjpcIlllc3RlcmRheVwifWVsc2UgaWYodG9tb3Jyb3dfeSgpPT09eSYmdG9tb3Jyb3dfbSgpPT09bSYmdG9tb3Jyb3dfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRtd1wiOlwiVG9tb3Jyb3dcIn1yZXR1cm4gZGF5TmFtZX07dmFyIGdldFdlZWs9ZnVuY3Rpb24gZ2V0V2VlayhkYXRlKXt2YXIgdGFyZ2V0VGh1cnNkYXk9bmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSxkYXRlLmdldERhdGUoKSk7dGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCktKHRhcmdldFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGZpcnN0VGh1cnNkYXk9bmV3IERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RnVsbFllYXIoKSwwLDQpO2ZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKS0oZmlyc3RUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBkcz10YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpLWZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTt0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpLWRzKTt2YXIgd2Vla0RpZmY9KHRhcmdldFRodXJzZGF5LWZpcnN0VGh1cnNkYXkpLyg4NjRlNSo3KTtyZXR1cm4gMStNYXRoLmZsb29yKHdlZWtEaWZmKX07dmFyIGdldERheU9mV2Vlaz1mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSl7dmFyIGRvdz1kYXRlLmdldERheSgpO2lmKGRvdz09PTApe2Rvdz03fXJldHVybiBkb3d9O2V4cG9ydCB2YXIgZm9ybWF0VGltZXpvbmU9ZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUoZGF0ZSl7cmV0dXJuKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvZG9BcnJheUZ1bmN0aW9ucyB9IGZyb20gXCIuL1RvZG9BcnJheUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHsgVUlGdW5jdGlvbnMgfSBmcm9tIFwiLi9VSUZ1bmN0aW9uc1wiO1xuXG5jb25zdCB1aSA9IFVJRnVuY3Rpb25zKCk7XG5jb25zdCB0b2RvQXJyYXlGdW5jdGlvbnMgPSBUb2RvQXJyYXlGdW5jdGlvbnMoKTtcblxudWkuZXZlbnRMaXN0ZW5lcnMoKTtcbnVpLmRpc3BsYXlUb2RvTGlzdCgpO1xudG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuXG4vLyBTaGl0IGNvZGUgYmVsb3cgdG8gdHJ5IGFuZCByZXRyaWV2ZSBwcm9qZWN0cyBmcm9tIGxvY2Fsc3RvcmFnZSwgZGlzcGxheSBwcm9qZWN0IGFuZCBjb3JyZXNwb25kaW5nIHRvZG9zXG5cbmlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9MaXN0QXJyYXlUb2RheVwiKSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChcbiAgICAgIGxvY2FsU3RvcmFnZS5rZXkoaSkgIT09IFwidG9kb0xpc3RDb21wbGV0ZWRcIiAmJlxuICAgICAgbG9jYWxTdG9yYWdlLmtleShpKSAhPT0gXCJ0b2RvTGlzdEFycmF5VG9kYXlcIiAmJlxuICAgICAgbG9jYWxTdG9yYWdlLmtleShpKSAhPT0gXCJ0b2RvTGlzdEFycmF5VXBjb21pbmdcIlxuICAgICkge1xuICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLmFkZFByb2plY3QobG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICB1aS5kaXNwbGF5UHJvamVjdChsb2NhbFN0b3JhZ2Uua2V5KGkpKTtcbiAgICAgIHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdENvdW50ZXIoKTtcbiAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG4gICAgICB0b2RvQXJyYXlGdW5jdGlvbnMudG9kb0xpc3RBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtWzBdID09IGtleSkge1xuICAgICAgICAgIGl0ZW0ucHVzaChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaSkpKVsxXSk7XG4gICAgICAgICAgdG9kb0FycmF5RnVuY3Rpb25zLnRvZG9MaXN0Q291bnRlcigpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRvZG9BcnJheUZ1bmN0aW9ucy50b2RvTGlzdEFycmF5KTtcbiAgICAgICAgICB1aS5kaXNwbGF5VG9kbyhcbiAgICAgICAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlLmtleShpKSkpWzFdLFxuICAgICAgICAgICAgMFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTaGl0IGNvZGUgYWJvdmUgdG8gdHJ5IGFuZCByZXRyaWV2ZSBwcm9qZWN0cyBmcm9tIGxvY2Fsc3RvcmFnZSwgZGlzcGxheSBwcm9qZWN0IGFuZCBjb3JyZXNwb25kaW5nIHRvZG9zXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=