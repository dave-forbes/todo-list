import TodoList from "./todoList.js";

test("getTodaysDate() updates TodoList today property to today's date", () => {
  const todoList = new TodoList();
  expect(todoList.todayDate).toBe("2023-11-19");
});

test("getTomorrowsDate() updates TodoList today property to tomorrow's date", () => {
  const todoList = new TodoList();
  expect(todoList.tomorrowDate).toBe("2023-11-20");
});

test("addTodo() adds a todo to todolist", () => {
  const todoList = new TodoList();
  todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-19",
    "High",
    "Inbox"
  );
  expect(todoList.today.length).toBe(1);
  todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-20",
    "High",
    "Inbox"
  );
  expect(todoList.upcomming.length).toBe(1);
});

test("addProject() creates new property in todolist", () => {
  const todoList = new TodoList();
  todoList.addProject("Study");
  expect(typeof todoList["Study"]).toBe("object");
  expect(todoList["Study"].length).toBe(0);
});

test("addTodo() adds a todo to projects", () => {
  const todoList = new TodoList();
  todoList.addProject("Study");
  todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-19",
    "High",
    "Study"
  );
  expect(todoList["Study"].length).toBe(1);
});

test("removeTodo() removes todo from correct array", () => {
  const todoList = new TodoList();
  todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-19",
    "High",
    "Inbox"
  );
  todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-20",
    "High",
    "Inbox"
  );
  const todo = todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-19",
    "High",
    "Study"
  );
  todoList.addProject("Study");
  expect(todoList.today.length).toBe(1);
  todoList.removeTodo(todoList.today, 0);
  expect(todoList.today.length).toBe(0);
  todoList.removeTodo(todoList.upcomming, 0);
  todoList.removeTodo(todoList[todo.project], 0);
  expect(todoList.upcomming.length).toBe(0);
  expect(todoList[todo.project].length).toBe(0);
});

test("completeTodo() adjusts the completed property of correct todo", () => {
  const todoList = new TodoList();
  todoList.addProject("Study");
  const todo = todoList.addTodo(
    "Clothes Wash",
    "Put closthes in washing machine, then run cycle",
    "2023-11-19",
    "High",
    "Study"
  );
  todoList.completeTodo(todoList[todo.project], 0);
  expect(todo.completed).toBe(true);
  expect(todoList.completed.length).toBe(1);
});
