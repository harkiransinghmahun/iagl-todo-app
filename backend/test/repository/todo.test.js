
const repository = require('../../src/repository/todo');

describe('TODO repository', () => {
  it('should return the todo list', async () => {
    const expected = [
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
        ];
    const actual = await repository.getAllTodos();
    expect(actual).toEqual(expected);
  });

  it('should save a new todo', async () => {
    const newTodo = {
      id: 3,
      title: 'Test Title',
      description: 'Test Description',
      isCompleted: false,
    };

    const saved = await repository.saveNewTodo(newTodo);
    expect(saved).toEqual(newTodo);
  });

  it('should get a todo by ID', async () => {
    const id = 1;
    const todo = await repository.getTodoById(id);
    expect(todo).toBeDefined();
    expect(todo.id).toBe(id);
  });

  it('should mark a todo as complete', async () => {
    const id = 1;
    const updated = await repository.updateStatus(id, true);
    expect(updated).toBeDefined();
    expect(updated.isCompleted).toBe(true);
  });

  it('should delete a todo by ID', async () => {
    const id = 1;
    const deleted = await repository.deleteTodoById(id);
    expect(deleted).toBeDefined();
    expect(deleted.id).toBe(id);

    const shouldBeNull = await repository.getTodoById(id);
    expect(shouldBeNull).toBeNull();
  });
});