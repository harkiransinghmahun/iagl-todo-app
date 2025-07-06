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
    },

    deleteTodoById: async (id) => {
      return await repository.deleteTodoById(id);
    }

  };
};

function idGenerator(allTodos) {
  if (allTodos.length === 0) return 1;
  const maxId = Math.max(...allTodos.map(todo => todo.id));
  return maxId + 1;
}

module.exports = todoService;