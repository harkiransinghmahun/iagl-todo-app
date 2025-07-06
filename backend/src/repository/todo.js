
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

  createNewTodo: (todo) => {
    const sizeBeforeInsertion = todoList.todos.length;
    todoList.todos.push(todo);
    const sizeAfterInsertion = todoList.todos.length;

    return (sizeAfterInsertion - sizeBeforeInsertion === 1) ? Promise.resolve(todo) : null;
  },

  markComplete: (id) => {
    const todo = todoList.todos.find(todo => todo.id === id);
    if (todo) {
      todo.isCompleted = true;
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
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