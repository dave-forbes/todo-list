import dateFormat from "dateformat";
import { UIFunctions } from "./UIFunctions";

const ui = UIFunctions();

export function TodoArrayFunctions() {

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