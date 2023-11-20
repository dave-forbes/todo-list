import Todo from "./todo.js";

export default class TodoList {
  constructor() {
    this.today = [];
    this.upcoming = [];
    this.completed = [];
  }

  dateFormat(date) {
    const array = date.toLocaleDateString("en-GB").split("/");
    const newArray = [array[2], array[1], array[0]];
    return newArray.join("-");
  }

  getTodaysDate() {
    const date = new Date();
    return this.dateFormat(date);
  }

  getTomorrowsDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return this.dateFormat(date);
  }

  calculateRemainingDays(dueDate) {
    let result;
    if (dueDate === "") {
      return "No due date";
    } else if (dueDate === this.getTodaysDate()) {
      result = `Due today!`;
    } else if (dueDate === this.getTomorrowsDate()) {
      result = `Due tomorrow!`;
    } else {
      for (let i = 0; i < 100; i += 1) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        if (dueDate === this.dateFormat(date)) {
          result = `Due in ${i} days`;
        }
      }
    }
    return result;
  }

  addTodo(title, description, dueDate, priority, project) {
    const newTodo = new Todo(
      title,
      description,
      dueDate,
      priority,
      project,
      false
    );
    if (newTodo.dueDate === this.getTodaysDate() && newTodo.project === "Inbox")
      this.today.push(newTodo);
    if (newTodo.dueDate !== this.getTodaysDate() && newTodo.project === "Inbox")
      this.upcoming.push(newTodo);
    if (newTodo.project !== "Inbox") {
      for (const property in this) {
        if (property === newTodo.project) {
          this[property].push(newTodo);
        }
      }
    }
    return newTodo;
  }

  addProject(value) {
    for (const array in this) {
      if (array === value) return false;
    }
    this[value] = [];
    return true;
  }

  removeTodo(array, index) {
    array.splice(index, 1);
  }

  completeTodo(array, index) {
    array[index].completed = true;
    const completedTodo = array.splice(index, 1);
    this.completed.push(completedTodo[0]);
  }

  findTodo(array, index) {
    return array[index];
  }
}
