import dateFormat from "dateformat";
import { TodoArrayFunctions } from "./TodoArrayFunctions";

const todoArrayFunctions = TodoArrayFunctions();

export function UIFunctions() {
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
        if (dueDate == dateFormat(todoArrayFunctions.nextDay, "yyyy-mm-dd")) {
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
