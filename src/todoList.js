import Todo from "./todo.js";

export default class TodoList {
  constructor() {
    this.today = [];
    this.upcomming = [];
    this.completed = [];
    this.todayDate = this.getTodaysDate();
    this.tomorrowDate = this.getTomorrowsDate();
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

  addTodo(title, description, dueDate, priority, project) {
    const newTodo = new Todo(
      title,
      description,
      dueDate,
      priority,
      project,
      false
    );
    if (newTodo.dueDate === this.todayDate && newTodo.project === "Inbox")
      this.today.push(newTodo);
    if (newTodo.dueDate !== this.todayDate && newTodo.project === "Inbox")
      this.upcomming.push(newTodo);
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
    this[value] = [];
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
