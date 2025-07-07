const NotFoundError = require('../errors/NotFoundError');
const DataAccessError = require('../errors/DataAccessError');

const todoService = (repository) => {
  return {
    getAllTodos: async () => {
      try {
        return await repository.getAllTodos();
      } catch (error) {
        console.error("Failed to fetch all todos from repository:", error);
        throw new DataAccessError(
            "Failed to fetch all todos from repository: " + error.message,
            "Unable to fetch all todos"
        );
      }
    },

    getTodoById: async (id) => {
      try {
        const todo = await repository.getTodoById(id);
        if (!todo) {
          console.warn(`Todo with ID ${id} not found`);
          throw new NotFoundError(`Todo with ID ${id} not found`, 'Todo not found');
        }
        return todo;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        console.error(`Failed to fetch todo with ID ${id} from repository:`, error);
        throw new DataAccessError(
            `Failed to fetch todo with ID ${id} from repository: ${error.message}`,
            'Unable to fetch todo'
        );
      }
    },

    saveNewTodo: async (title, description) => {
      try {
        const allTodos = await repository.getAllTodos();
        const nextId = idGenerator(allTodos);

        const newTodo = {
          id: nextId,
          title,
          description,
          isCompleted: false,
        };

        return await repository.saveNewTodo(newTodo);
      } catch (error) {
        console.error("Failed to save new todo: ", error);
        throw new DataAccessError(
            "Failed to save new todo in the repository: " + error.message,
            "Unable to save new todo"
        );
      }
    },

    updateStatus: async (id, isCompleted) => {
      try {
        const updatedTodo = await repository.updateStatus(id, isCompleted);
        if (!updatedTodo) {
          throw new NotFoundError(`Todo with ID ${id} not found`, 'Todo not found');
        }
        return updatedTodo;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        console.error(`Failed to mark todo with ID ${id} as complete:`, error);
        throw new DataAccessError(
            `Failed to mark todo with ID ${id} as complete: ${error.message}`,
            'Unable to update todo status'
        );
      }
    },

    deleteTodoById: async (id) => {
      try {
        const deletedTodo = await repository.deleteTodoById(id);
        if (!deletedTodo) {
          throw new NotFoundError(`Todo with ID ${id} not found`, 'Todo not found');
        }
        return deletedTodo;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        console.error(`Failed to delete todo with ID ${id}:`, error);
        throw new DataAccessError(
          `Failed to delete todo with ID ${id}: ${error.message}`,
          'Unable to delete todo'
        );
      }
    }

  };
};

function idGenerator(allTodos) {
  if (allTodos.length === 0) return 1;
  const maxId = Math.max(...allTodos.map(todo => todo.id));
  return maxId + 1;
}

module.exports = todoService;