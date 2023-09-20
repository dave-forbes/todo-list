import { TodoArrayFunctions } from "./TodoArrayFunctions";
import { UIFunctions } from "./UIFunctions";

const ui = UIFunctions();
const todoArrayFunctions = TodoArrayFunctions();

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
