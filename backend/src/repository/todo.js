
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

    return Promise.resolve(sizeAfterInsertion - sizeBeforeInsertion === 1);
  }

};