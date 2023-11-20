/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UIFunctions.js":
/*!****************************!*\
  !*** ./src/UIFunctions.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UIFunctions: () => (/* binding */ UIFunctions)\n/* harmony export */ });\n/* harmony import */ var _todoList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoList.js */ \"./src/todoList.js\");\n\n\nfunction UIFunctions() {\n  const todoList = new _todoList_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  function retrieveLocalStorage() {\n    const data = JSON.parse(localStorage.getItem(\"todoList\"));\n    if (data) {\n      todoList.today = data.today;\n      todoList.upcoming = data.upcoming;\n      todoList.completed = data.completed;\n      for (const project in data) {\n        if (\n          project !== \"today\" &&\n          project !== \"upcoming\" &&\n          project !== \"completed\"\n        ) {\n          todoList[project] = data[project];\n          displayProject(project);\n        }\n      }\n    }\n  }\n\n  function clearStorage() {\n    localStorage.clear();\n    location.reload();\n  }\n\n  function saveData(e) {\n    if (e.target.id === \"clear-storage-button\") return;\n    const data = JSON.stringify(todoList);\n    localStorage.clear();\n    localStorage.setItem(\"todoList\", data);\n  }\n\n  let currentPage = \"Inbox\";\n\n  function toggleTodoForm(text) {\n    const addTodoFormButton = document.querySelector(\".add-todo-container\");\n    const addTodoForm = document.querySelector(\".add-todo-form\");\n    if (todoToEditNode) todoToEditNode.classList.toggle(\"hide\");\n    addTodoForm.classList.toggle(\"hide\");\n    addTodoFormButton.classList.toggle(\"hide\");\n    const addTodoButton = document.querySelector(\"#add-todo-button\");\n    addTodoButton.textContent = `${text}`;\n    clearTodoForm();\n  }\n\n  function toggleProjectForm() {\n    const addProjectsForm = document.querySelector(\".add-projects-form\");\n    addProjectsForm.classList.toggle(\"hide\");\n    const addProjectsFormButton = document.querySelector(\n      \".add-projects-container\"\n    );\n    addProjectsFormButton.classList.toggle(\"hide\");\n    clearProjectsForm();\n  }\n\n  function displayProject(title) {\n    const option = document.createElement(\"option\");\n    option.value = title;\n    option.innerHTML = title;\n    const projectSelect = document.querySelector(\"#project-select\");\n    projectSelect.appendChild(option);\n    const projectsDiv = document.querySelector(\"#projects\");\n    const p = document.createElement(\"p\");\n    p.style.textAlign = \"center\";\n    const projectTrashIcon = document.createElement(\"i\");\n    projectTrashIcon.classList.add(\"fa-solid\");\n    projectTrashIcon.classList.add(\"fa-diagram-project\");\n    p.innerHTML = `${title} - <span data-index=\"${title}\"></span>`;\n    const div = document.createElement(\"div\");\n    div.classList.add(\"nav-item\");\n    div.appendChild(projectTrashIcon);\n    div.appendChild(p);\n    projectsDiv.appendChild(div);\n    p.setAttribute(\"data-index\", title);\n    projectTrashIcon.setAttribute(\"data-index\", title);\n    div.setAttribute(\"data-index\", title);\n  }\n\n  function clearProjectsForm() {\n    const addProjectsInput = document.querySelector(\"#add-projects-input\");\n    addProjectsInput.value = \"\";\n  }\n\n  function clearTodoForm() {\n    const todoTitleInput = document.querySelector(\"#todo-title-input\");\n    const todoDescriptionInput = document.querySelector(\n      \"#todo-description-input\"\n    );\n    const todoDueDateInput = document.querySelector(\"#todo-due-date-input\");\n    const todoPriorityInput = document.querySelector(\"#todo-priority-input\");\n    todoTitleInput.value = \"\";\n    todoDescriptionInput.value = \"\";\n    todoDueDateInput.value = \"\";\n    todoPriorityInput.value = \"\";\n  }\n\n  function displayTodo(todo, index) {\n    const container = document.createElement(\"div\");\n    container.setAttribute(\"data-index\", index);\n\n    if (todo.dueDate === todoList.getTodaysDate() && todo.project === \"Inbox\")\n      container.classList.add(\"today\");\n    if (todo.dueDate !== todoList.getTodaysDate() && todo.project === \"Inbox\")\n      container.classList.add(\"upcoming\");\n    if (todo.project !== \"Inbox\") container.classList.add(todo.project);\n\n    const todoTitle = document.createElement(\"div\");\n    todoTitle.classList.add(\"todo-title\");\n    const todoTitleText = document.createElement(\"h4\");\n    if (todo.title === \"\") todo.title = \"Untitled\";\n    todoTitleText.textContent = todo.title;\n    const todoCheckBox = document.createElement(\"input\");\n    todoCheckBox.setAttribute(\"type\", \"checkbox\");\n    todoCheckBox.classList.add(\"check-box\");\n    const todoTitleWrapper = document.createElement(\"div\");\n    todoTitleWrapper.style.cssText =\n      \"display: flex; gap: 1rem; align-items: center;\";\n    todoTitleWrapper.appendChild(todoCheckBox);\n    todoTitleWrapper.appendChild(todoTitleText);\n    todoTitle.appendChild(todoTitleWrapper);\n    const todoTitleIconWrapper = document.createElement(\"div\");\n    todoTitleIconWrapper.style.cssText = \"display: flex; gap: 2rem;\";\n    const todoEditIcon = document.createElement(\"i\");\n    todoEditIcon.classList.add(\"fa-solid\");\n    todoEditIcon.classList.add(\"fa-pen-to-square\");\n    const todoTrashIcon = document.createElement(\"i\");\n    todoTrashIcon.classList.add(\"fa-solid\");\n    todoTrashIcon.classList.add(\"fa-trash\");\n    todoTitleIconWrapper.appendChild(todoEditIcon);\n    todoTitleIconWrapper.appendChild(todoTrashIcon);\n    todoTitle.appendChild(todoTitleIconWrapper);\n\n    const todoDescription = document.createElement(\"p\");\n    todoDescription.textContent = todo.description;\n\n    const todoPriority = document.createElement(\"div\");\n    todoPriority.classList.add(\"todo-priority\");\n\n    if (todo.priority === \"low\" || todo.priority === \"\") {\n      todoPriority.style.backgroundColor = \"green\";\n      todoPriority.textContent = \"Low Priority\";\n    } else if (todo.priority === \"medium\") {\n      todoPriority.style.backgroundColor = \"orange\";\n      todoPriority.textContent = \"Medium Priority\";\n    } else if (todo.priority === \"high\") {\n      todoPriority.style.backgroundColor = \"red\";\n      todoPriority.textContent = \"High Priority\";\n    }\n    const priorityContainer = document.createElement(\"div\");\n    priorityContainer.classList.add(\"todo-priority\");\n    priorityContainer.classList.add(\"todo-containers\");\n    priorityContainer.appendChild(todoPriority);\n\n    const todoDueDate = document.createElement(\"p\");\n    todoDueDate.textContent = todoList.calculateRemainingDays(todo.dueDate);\n    todoDueDate.style.cssText = \"margin: 0;\";\n\n    const dueDateContainer = document.createElement(\"div\");\n    dueDateContainer.classList.add(\"todo-due-date\");\n    dueDateContainer.classList.add(\"todo-containers\");\n    dueDateContainer.appendChild(todoDueDate);\n\n    const flexDiv = document.createElement(\"div\");\n    flexDiv.style.cssText = \"display: flex; align-items: center; gap: 2rem;\";\n    flexDiv.appendChild(priorityContainer);\n    flexDiv.appendChild(dueDateContainer);\n    if (todo.project !== \"Inbox\") {\n      const projectContainer = document.createElement(\"div\");\n      projectContainer.classList.add(\"todo-project\");\n      projectContainer.classList.add(\"todo-containers\");\n      projectContainer.innerHTML = todo.project;\n      flexDiv.appendChild(projectContainer);\n    }\n\n    if (todo.completed === true) {\n      container.classList.add(\"line-through\");\n      todoTrashIcon.style.display = \"none\";\n      todoCheckBox.checked = true;\n      todoCheckBox.disabled = true;\n    }\n\n    container.appendChild(todoTitle);\n    container.appendChild(todoDescription);\n    container.appendChild(flexDiv);\n    container.classList.add(\"todo\");\n    const todoListUI = document.querySelector(\".todo-list\");\n    todoListUI.appendChild(container);\n  }\n\n  function displayTodoList() {\n    const todoListUI = document.querySelector(\".todo-list\");\n    todoListUI.innerHTML = \"\";\n    if (currentPage === \"Inbox\") {\n      for (const array in todoList) {\n        todoList[array].forEach((item, index) => {\n          if (item.completed === false) displayTodo(item, index);\n        });\n      }\n    } else if (currentPage === \"Today\") {\n      todoList.today.forEach((item, index) => displayTodo(item, index));\n    } else if (currentPage === \"Upcoming\") {\n      todoList.upcoming.forEach((item, index) => displayTodo(item, index));\n    } else if (currentPage === \"Completed\") {\n      todoList.completed.forEach((item, index) => displayTodo(item, index));\n    } else {\n      for (const array in todoList) {\n        todoList[array].forEach((item, index) => {\n          if (item.project === currentPage && item.completed === false) {\n            displayTodo(item, index);\n          }\n        });\n      }\n    }\n  }\n\n  function toggleSideBar() {\n    const sideBar = document.querySelector(\".side-bar\");\n    sideBar.classList.toggle(\"side-bar-hide\");\n  }\n\n  function switchTodoListType(e) {\n    if (\n      e.target.classList.contains(\"nav-item\") ||\n      e.target.parentElement.classList.contains(\"nav-item\") ||\n      e.target.parentElement.parentElement.classList.contains(\"nav-item\")\n    ) {\n      if (\n        e.target.classList.contains(\"add-projects-container\") ||\n        e.target.parentElement.classList.contains(\"add-projects-container\")\n      )\n        return;\n      const todoListType = document.querySelector(\".todo-list-type\");\n      todoListType.innerHTML = e.target.dataset.index;\n      currentPage = e.target.dataset.index;\n      displayTodoList();\n      toggleSideBar();\n    }\n  }\n\n  function checkCompleteTodo(e) {\n    if (e.target.classList.contains(\"check-box\")) {\n      const node = e.target.parentElement.parentElement.parentElement;\n      const { index } = node.dataset;\n      node.classList.add(\"line-through\");\n      if (node.classList.contains(\"today\")) {\n        todoList.completeTodo(todoList.today, index);\n      } else if (node.classList.contains(\"upcoming\")) {\n        todoList.completeTodo(todoList.upcoming, index);\n      } else {\n        const project = node.classList[0];\n        for (const array in todoList) {\n          if (project === array) {\n            todoList.completeTodo(todoList[array], index);\n          }\n        }\n      }\n      setTimeout(() => {\n        displayTodoList();\n        todoListCounter();\n      }, 1000);\n    }\n  }\n\n  function clickRemoveTodo(e) {\n    if (e.target.classList.contains(\"fa-trash\")) {\n      const node = e.target.parentElement.parentElement.parentElement;\n      const { index } = node.dataset;\n      if (node.classList.contains(\"today\")) {\n        todoList.removeTodo(todoList.today, index);\n      } else if (node.classList.contains(\"upcoming\")) {\n        todoList.removeTodo(todoList.upcoming, index);\n      } else {\n        const project = node.classList[0];\n        for (const array in todoList) {\n          if (project === array) {\n            todoList.removeTodo(todoList[array], index);\n          }\n        }\n      }\n      displayTodoList();\n      todoListCounter();\n    }\n  }\n\n  let todoToEdit;\n  let todoToEditArray;\n  let todoToEditIndex;\n  let todoToEditNode;\n\n  function preFillFormInputs() {\n    const todoTitleInput = document.querySelector(\"#todo-title-input\");\n    const todoDescriptionInput = document.querySelector(\n      \"#todo-description-input\"\n    );\n    const todoDueDateInput = document.querySelector(\"#todo-due-date-input\");\n    const todoPriorityInput = document.querySelector(\"#todo-priority-input\");\n    const projectSelect = document.querySelector(\"#project-select\");\n    todoTitleInput.value = todoToEdit.title;\n    todoDescriptionInput.value = todoToEdit.description;\n    todoDueDateInput.value = todoToEdit.dueDate;\n    todoPriorityInput.value = todoToEdit.priority;\n    projectSelect.value = todoToEdit.project;\n  }\n\n  function toggleEditTodoForm(e) {\n    if (e.target.classList.contains(\"fa-pen-to-square\")) {\n      toggleTodoForm(\"Edit Todo\");\n      const node = e.target.parentElement.parentElement.parentElement;\n      node.classList.toggle(\"hide\");\n      const { index } = node.dataset;\n      todoToEditIndex = index;\n      todoToEditNode = node;\n      if (node.classList.contains(\"today\")) {\n        todoToEdit = todoList.findTodo(todoList.today, index);\n        preFillFormInputs();\n        todoToEditArray = todoList.today;\n      } else if (node.classList.contains(\"upcoming\")) {\n        todoToEdit = todoList.findTodo(todoList.upcoming, index);\n        preFillFormInputs();\n        todoToEditArray = todoList.upcoming;\n      } else {\n        const project = node.classList[0];\n        for (const array in todoList) {\n          if (array === project) {\n            todoToEdit = todoList.findTodo(todoList[array], index);\n            preFillFormInputs();\n            todoToEditArray = todoList[array];\n          }\n        }\n      }\n    }\n  }\n\n  function clickEditTodo() {\n    const todoTitleInput = document.querySelector(\"#todo-title-input\");\n    const todoDescriptionInput = document.querySelector(\n      \"#todo-description-input\"\n    );\n    const todoDueDateInput = document.querySelector(\"#todo-due-date-input\");\n    const todoPriorityInput = document.querySelector(\"#todo-priority-input\");\n    const projectSelect = document.querySelector(\"#project-select\");\n    todoList.removeTodo(todoToEditArray, todoToEditIndex);\n    todoList.addTodo(\n      todoTitleInput.value,\n      todoDescriptionInput.value,\n      todoDueDateInput.value,\n      todoPriorityInput.value,\n      projectSelect.value\n    );\n    toggleTodoForm();\n    displayTodoList();\n  }\n\n  function displayNumberOfTodos(listType, counter) {\n    document.querySelector(`span[data-index=\"${listType}\"]`).textContent =\n      counter;\n  }\n\n  function todoListCounter() {\n    let inboxCounter = 0;\n    for (const array in todoList) {\n      todoList[array].forEach((item) => {\n        if (item.completed === false) {\n          inboxCounter++;\n        }\n      });\n    }\n    displayNumberOfTodos(\"Inbox\", inboxCounter);\n\n    let todayCounter = 0;\n    todoList.today.forEach(() => todayCounter++);\n    displayNumberOfTodos(\"Today\", todayCounter);\n\n    let upcomingCounter = 0;\n    todoList.upcoming.forEach(() => upcomingCounter++);\n    displayNumberOfTodos(\"Upcoming\", upcomingCounter);\n\n    let completedCounter = 0;\n    todoList.completed.forEach(() => completedCounter++);\n    displayNumberOfTodos(\"Completed\", completedCounter);\n\n    for (const array in todoList) {\n      let counter = 0;\n      if (array !== \"today\" && array !== \"upcoming\" && array !== \"completed\") {\n        todoList[array].forEach(() => {\n          counter++;\n        });\n        displayNumberOfTodos(array, counter);\n      }\n    }\n  }\n\n  function clickAddTodo() {\n    const todoTitleInput = document.querySelector(\"#todo-title-input\");\n    const todoDescriptionInput = document.querySelector(\n      \"#todo-description-input\"\n    );\n    const todoDueDateInput = document.querySelector(\"#todo-due-date-input\");\n    const todoPriorityInput = document.querySelector(\"#todo-priority-input\");\n    const projectSelect = document.querySelector(\"#project-select\");\n    const addTodoButton = document.querySelector(\"#add-todo-button\");\n    if (addTodoButton.textContent === \"Add Todo\") {\n      todoList.addTodo(\n        todoTitleInput.value,\n        todoDescriptionInput.value,\n        todoDueDateInput.value,\n        todoPriorityInput.value,\n        projectSelect.value\n      );\n      toggleTodoForm();\n      displayTodoList();\n      todoListCounter();\n    } else {\n      clickEditTodo();\n      todoListCounter();\n    }\n  }\n\n  function clickAddProjects() {\n    const addProjectsInput = document.querySelector(\"#add-projects-input\");\n    const { value } = addProjectsInput;\n    const newValue = value.replaceAll(/\\s/g, \"-\");\n    const success = todoList.addProject(newValue);\n    if (success) displayProject(newValue);\n    toggleProjectForm();\n    todoListCounter();\n  }\n\n  function eventListeners() {\n    const addTodoFormButton = document.querySelector(\".add-todo-container\");\n    addTodoFormButton.addEventListener(\"click\", () =>\n      toggleTodoForm(\"Add Todo\")\n    );\n    const cancelTodoForm = document.querySelector(\"#cancel-form\");\n    cancelTodoForm.addEventListener(\"click\", toggleTodoForm);\n    const addProjectsFormButton = document.querySelector(\n      \".add-projects-container\"\n    );\n    addProjectsFormButton.addEventListener(\"click\", toggleProjectForm);\n    const cancelProjectsButton = document.querySelector(\n      \"#cancel-project-form-button\"\n    );\n    cancelProjectsButton.addEventListener(\"click\", toggleProjectForm);\n    const addTodoButton = document.querySelector(\"#add-todo-button\");\n    addTodoButton.addEventListener(\"click\", clickAddTodo);\n    const addProjectsButton = document.querySelector(\"#add-projects-button\");\n    addProjectsButton.addEventListener(\"click\", clickAddProjects);\n    const sideBar = document.querySelector(\".side-bar\");\n    sideBar.addEventListener(\"click\", (e) => switchTodoListType(e));\n    document.addEventListener(\"click\", checkCompleteTodo);\n    document.addEventListener(\"click\", clickRemoveTodo);\n    document.addEventListener(\"click\", toggleEditTodoForm);\n    const burgerMenu = document.querySelectorAll(\".burger-menu\");\n    burgerMenu.forEach((menu) => menu.addEventListener(\"click\", toggleSideBar));\n    window.addEventListener(\"click\", saveData);\n    const clearStorageButton = document.querySelector(\"#clear-storage-button\");\n    clearStorageButton.addEventListener(\"click\", clearStorage);\n  }\n\n  return {\n    eventListeners,\n    displayTodoList,\n    todoListCounter,\n    retrieveLocalStorage,\n  };\n}\n\n\n//# sourceURL=webpack://todo-list/./src/UIFunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UIFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIFunctions.js */ \"./src/UIFunctions.js\");\n\n\nconst ui = (0,_UIFunctions_js__WEBPACK_IMPORTED_MODULE_0__.UIFunctions)();\n\nui.retrieveLocalStorage();\nui.eventListeners();\nui.displayTodoList();\nui.todoListCounter();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ todo)\n/* harmony export */ });\nclass todo {\n  constructor(title, description, dueDate, priority, project, completed) {\n    this.title = title;\n    this.description = description;\n    this.dueDate = dueDate;\n    this.priority = priority;\n    this.project = project;\n    this.completed = completed;\n  }\n}\n\n\n//# sourceURL=webpack://todo-list/./src/todo.js?");

/***/ }),

/***/ "./src/todoList.js":
/*!*************************!*\
  !*** ./src/todoList.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TodoList)\n/* harmony export */ });\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ \"./src/todo.js\");\n\n\nclass TodoList {\n  constructor() {\n    this.today = [];\n    this.upcoming = [];\n    this.completed = [];\n  }\n\n  dateFormat(date) {\n    const array = date.toLocaleDateString(\"en-GB\").split(\"/\");\n    const newArray = [array[2], array[1], array[0]];\n    return newArray.join(\"-\");\n  }\n\n  getTodaysDate() {\n    const date = new Date();\n    return this.dateFormat(date);\n  }\n\n  getTomorrowsDate() {\n    const date = new Date();\n    date.setDate(date.getDate() + 1);\n    return this.dateFormat(date);\n  }\n\n  calculateRemainingDays(dueDate) {\n    let result;\n    if (dueDate === \"\") {\n      return \"No due date\";\n    } else if (dueDate === this.getTodaysDate()) {\n      result = `Due today!`;\n    } else if (dueDate === this.getTomorrowsDate()) {\n      result = `Due tomorrow!`;\n    } else {\n      for (let i = 0; i < 100; i += 1) {\n        const date = new Date();\n        date.setDate(date.getDate() + i);\n        if (dueDate === this.dateFormat(date)) {\n          result = `Due in ${i} days`;\n        }\n      }\n    }\n    return result;\n  }\n\n  addTodo(title, description, dueDate, priority, project) {\n    const newTodo = new _todo_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n      title,\n      description,\n      dueDate,\n      priority,\n      project,\n      false\n    );\n    if (newTodo.dueDate === this.getTodaysDate() && newTodo.project === \"Inbox\")\n      this.today.push(newTodo);\n    if (newTodo.dueDate !== this.getTodaysDate() && newTodo.project === \"Inbox\")\n      this.upcoming.push(newTodo);\n    if (newTodo.project !== \"Inbox\") {\n      for (const property in this) {\n        if (property === newTodo.project) {\n          this[property].push(newTodo);\n        }\n      }\n    }\n    return newTodo;\n  }\n\n  addProject(value) {\n    for (const array in this) {\n      if (array === value) return false;\n    }\n    this[value] = [];\n    return true;\n  }\n\n  removeTodo(array, index) {\n    array.splice(index, 1);\n  }\n\n  completeTodo(array, index) {\n    array[index].completed = true;\n    const completedTodo = array.splice(index, 1);\n    this.completed.push(completedTodo[0]);\n  }\n\n  findTodo(array, index) {\n    return array[index];\n  }\n}\n\n\n//# sourceURL=webpack://todo-list/./src/todoList.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;