const todoService = (repository) => {
  return {
    getAllTodos: async () => {
      return await repository.getAllTodos()
    },

    getTodoById: async (id) => {
      return await repository.getTodoById(id);
    },

    createNewTodo: async (title, description) => {
      const allTodos = await repository.getAllTodos();
      const nextId = idGenerator(allTodos);

      const newTodo = {
        id: nextId,
        title: title,
        description: description,
        isCompleted: false
      }
      return await repository.createNewTodo(newTodo);
    }




  };
};

function idGenerator(allTodos) {
  if (allTodos.todos.length === 0) return 1;
  const maxId = Math.max(...allTodos.todos.map(todo => todo.id));
  return maxId + 1;
}

module.exports = todoService;