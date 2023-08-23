// import dateFormat from "dateformat";
import { TodoArrayFunctions } from "./TodoArrayFunctions";
import { UIFunctions } from "./UIFunctions";


const ui = UIFunctions();
const todoArrayFunctions = TodoArrayFunctions();

ui.eventListeners();
ui.displayTodoList();
todoArrayFunctions.todoListCounter();




