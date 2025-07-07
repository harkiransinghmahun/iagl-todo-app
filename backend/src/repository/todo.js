
let todoList = {
  todos: [
    {
      "id": 1,
      "title": "Task 1",
      "description": "My first task of the day",
      "isCompleted": false
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "My second task of the day",
      "isCompleted": false
    }
  ]
};

module.exports = {
  getAllTodos: () => Promise.resolve(todoList.todos),

  getTodoById: (id) => {
    const todoFromRepo = todoList.todos.find(todo => todo.id === id);
    return Promise.resolve(todoFromRepo || null);
  },

  saveNewTodo: (todo) => {
    todoList.todos.push(todo);
    return Promise.resolve(todo);
  },

  updateStatus: (id, isCompleted) => {
    const todo = todoList.todos.find(todo => todo.id === id);
    if (todo) {
      todo.isCompleted = isCompleted;
      return Promise.resolve(todo);
    } else {
      return Promise.reject(new Error(`Todo with ID ${id} not found`));
    }
  },

  deleteTodoById: (id) => {
    const index = todoList.todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      return Promise.resolve(null);
    }

    const deletedTodo = todoList.todos[index];
    todoList.todos.splice(index, 1);
    return Promise.resolve(deletedTodo);
  }

};