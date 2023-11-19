import TodoList from "./todoList.js";

export function UIFunctions() {
  const todoList = new TodoList();

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

  function calculateRemainingDays(dueDate) {
    let result;
    if (dueDate === todoList.todayDate) {
      result = `Due today!`;
    } else if (dueDate === todoList.tomorrowDate) {
      result = `Due tomorrow!`;
    } else {
      for (let i = 0; i < 100; i += 1) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        if (dueDate === todoList.dateFormat(date)) {
          result = `Due in ${i} days`;
        }
      }
    }
    return result;
  }

  const todoListUI = document.querySelector(".todo-list");

  function displayTodo(todo, index) {
    const container = document.createElement("div");
    container.setAttribute("data-index", index);

    if (todo.dueDate === todoList.todayDate && todo.project === "Inbox")
      container.classList.add("today");
    if (todo.dueDate !== todoList.todayDate && todo.project === "Inbox")
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

    if (todo.priority === "low" || todo.priority === "") {
      todoPriority.style.backgroundColor = "green";
      todoPriority.textContent = "Low Priority";
    } else if (todo.priority === "medium") {
      todoPriority.style.backgroundColor = "orange";
      todoPriority.textContent = "Medium Priority";
    } else if (todo.priority === "high") {
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

    if (todo.completed === true) {
      container.classList.add("line-through");
      todoTrashIcon.style.display = "none";
      todoCheckBox.checked = true;
      todoCheckBox.disabled = true;
    }

    container.appendChild(todoTitle);
    container.appendChild(todoDescription);
    container.appendChild(flexDiv);
    container.classList.add("todo");
    todoListUI.appendChild(container);
  }

  function displayTodoList() {
    todoListUI.innerHTML = "";
    if (currentPage === "Inbox") {
      for (const array in todoList) {
        if (typeof todoList[array] !== "object") continue;
        todoList[array].forEach((item, index) => {
          if (item.completed === false) displayTodo(item, index);
        });
      }
    } else if (currentPage === "Today") {
      todoList.today.forEach((item, index) => {
        if (item.dueDate === todoList.todayDate && item.completed === false)
          displayTodo(item, index);
      });
    } else if (currentPage === "Upcoming") {
      todoList.upcomming.forEach((item, index) => {
        if (item.dueDate !== todoList.todayDate && item.completed === false) {
          displayTodo(item, index);
        }
      });
    } else if (currentPage === "Completed") {
      todoList.completed.forEach((item, index) => displayTodo(item, index));
    } else {
      for (const property in todoList) {
        if (typeof todoList[property] !== "object") continue;
        todoList[property].forEach((item, index) => {
          if (
            item.project === currentPage &&
            typeof item === "object" &&
            item.completed === false
          ) {
            displayTodo(item, index);
          }
        });
      }
    }
  }

  const sideBar = document.querySelector(".side-bar");

  function toggleSideBar() {
    sideBar.classList.toggle("side-bar-hide");
  }

  function switchTodoListType(e) {
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
      const { index } = node.dataset;
      node.classList.add("line-through");
      if (node.classList.contains("today")) {
        todoList.completeTodo(todoList.today, index);
      } else if (node.classList.contains("upcoming")) {
        todoList.completeTodo(todoList.upcomming, index);
      } else {
        const project = node.classList[0];
        for (const property in todoList) {
          if (project === property) {
            todoList.completeTodo(todoList[property], index);
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
    if (e.target.classList.contains("fa-trash")) {
      const node = e.target.parentElement.parentElement.parentElement;
      const { index } = node.dataset;
      if (node.classList.contains("today")) {
        todoList.removeTodo(todoList.today, index);
      } else if (node.classList.contains("upcoming")) {
        todoList.removeTodo(todoList.upcomming, index);
      } else {
        const project = node.classList[0];
        for (const property in todoList) {
          if (project === property) {
            todoList.removeTodo(todoList[property], index);
          }
        }
      }
      displayTodoList();
      todoListCounter();
    }
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
      const { index } = node.dataset;
      todoToEditIndex = index;
      todoToEditNode = node;
      if (node.classList.contains("today")) {
        todoToEdit = todoList.findTodo(todoList.today, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
        todoToEditArray = todoList.today;
      } else if (node.classList.contains("upcoming")) {
        todoToEdit = todoList.findTodo(todoList.upcomming, index);
        todoTitleInput.value = todoToEdit.title;
        todoDescriptionInput.value = todoToEdit.description;
        todoDueDateInput.value = todoToEdit.dueDate;
        todoPriorityInput.value = todoToEdit.priority;
        todoToEditArray = todoList.upcomming;
      } else {
        const project = node.classList[0];
        for (const property in todoList) {
          if (property === project) {
            todoToEdit = todoList.findTodo(todoList[property], index);
            todoTitleInput.value = todoToEdit.title;
            todoDescriptionInput.value = todoToEdit.description;
            todoDueDateInput.value = todoToEdit.dueDate;
            todoPriorityInput.value = todoToEdit.priority;
            projectSelect.value = todoToEdit.project;
            todoToEditArray = todoList[property];
          }
        }
      }
    }
  }

  function clickEditTodo() {
    todoList.removeTodo(todoToEditArray, todoToEditIndex);
    todoList.addTodo(
      todoTitleInput.value,
      todoDescriptionInput.value,
      todoDueDateInput.value,
      todoPriorityInput.value,
      projectSelect.value
    );
    toggleTodoForm();
    displayTodoList();
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

  function todoListCounter() {
    let inboxCounter = 0;
    let todayCounter = 0;
    let upcomingCounter = 0;
    let completedCounter = 0;
    for (const array in todoList) {
      if (typeof todoList[array] === "object") {
        todoList[array].forEach((item) => {
          if (item.completed === false) {
            inboxCounter++;
          }
        });
      }
    }
    displayNumberOfTodos("Inbox", inboxCounter);

    todoList.today.forEach((item) => {
      if (typeof item === "object" && item.completed === false) todayCounter++;
    });
    displayNumberOfTodos("Today", todayCounter);

    todoList.upcomming.forEach((item) => {
      if (typeof item === "object" && item.completed === false)
        upcomingCounter++;
    });
    displayNumberOfTodos("Upcoming", upcomingCounter);

    todoList.completed.forEach(() => completedCounter++);
    displayNumberOfTodos("Completed", completedCounter);

    for (const array in todoList) {
      let counter = 0;
      if (
        typeof todoList[array] !== "object" ||
        array === "today" ||
        array === "upcomming" ||
        array === "completed"
      )
        continue;
      todoList[array].forEach(() => {
        counter++;
      });
      displayNumberOfTodos(array, counter);
    }
  }

  function eventListeners() {
    addTodoFormButton.addEventListener("click", () =>
      toggleTodoForm("Add Todo")
    );
    cancelTodoForm.addEventListener("click", toggleTodoForm);
    addProjectsFormButton.addEventListener("click", toggleProjectForm);
    cancelProjectsButton.addEventListener("click", toggleProjectForm);
    addTodoButton.addEventListener("click", () => {
      if (addTodoButton.textContent === "Add Todo") {
        todoList.addTodo(
          todoTitleInput.value,
          todoDescriptionInput.value,
          todoDueDateInput.value,
          todoPriorityInput.value,
          projectSelect.value
        );
        toggleTodoForm();
        displayTodoList();
        todoListCounter();
      } else {
        clickEditTodo();
        todoListCounter();
      }
    });
    addProjectsButton.addEventListener("click", () => {
      const { value } = addProjectsInput;
      const newValue = value.replaceAll(/\s/g, "-");
      todoList.addProject(newValue);
      displayProject(newValue);
      toggleProjectForm();
      todoListCounter();
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
    todoListCounter,
  };
}
