import dateFormat from "dateformat";
import { UIFunctions } from "./UIFunctions";

const ui = UIFunctions();

export function TodoArrayFunctions() {

  const now = new Date();
  const today = dateFormat(now, 'yyyy-mm-dd');
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);
  const tomorrow = dateFormat(nextDay, 'yyyy-mm-dd');

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