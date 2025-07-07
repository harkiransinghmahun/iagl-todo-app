describe('TODO Service', () => {
  it('should be able to get todos from repository', async () => {
    const expected =
        [
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
    const todoRepository = {
      getAllTodos: async () => Promise.resolve(expected)
    };

    const todoService = require('../../src/service/todo')(todoRepository);
    const actual = await todoService.getAllTodos();
    expect(actual).toEqual(expected);
  });

  it('should get a todo by ID', async () => {
    const mockTodo = { id: 1, title: 'Test', description: 'Desc', isCompleted: false };
    const todoRepository = {
      getTodoById: async (id) => id === 1 ? mockTodo : null,
    };
    const todoService = require('../../src/service/todo')(todoRepository);

    const result = await todoService.getTodoById(1);
    expect(result).toEqual(mockTodo);
  });

  it('should create a new todo', async () => {
    const newTodo = { id: 1, title: 'New', description: 'New desc', isCompleted: false };
    const todoRepository = {
      getAllTodos: async () => [],
      saveNewTodo: async (todo) => todo,
    };
    const idGenerator = () => 2;
    const todoService = require('../../src/service/todo')(todoRepository, idGenerator);

    const result = await todoService.saveNewTodo('New', 'New desc');
    expect(result).toEqual(newTodo);
  });

  it('should delete a todo by ID', async () => {
    const mockTodo = { id: 1, title: 'Test', description: 'Test', isCompleted: false };
    const todoRepository = {
      deleteTodoById: async (id) => id === 1 ? mockTodo : null,
    };
    const todoService = require('../../src/service/todo')(todoRepository);

    const result = await todoService.deleteTodoById(1);
    expect(result).toEqual(mockTodo);
  });

  it('should mark a todo as complete', async () => {
    const mockTodo = { id: 1, title: 'Test', description: 'Test', isCompleted: false };
    const updatedTodo = { ...mockTodo, isCompleted: true };
    const todoRepository = {
      updateStatus: async (id) => updatedTodo,
    };
    const todoService = require('../../src/service/todo')(todoRepository);

    const result = await todoService.updateStatus(1);
    expect(result.isCompleted).toBe(true);
  });
});