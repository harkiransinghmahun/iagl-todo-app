const express = require('express');
const cors = require('cors');
const repository = require('./repository/todo');
const todoService = require('./service/todo')(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

    /**
    GET all /api/todos
    */
    server.get('/api/todos', async (req, res) => {
        try {
            const todos = await todoService.getAllTodos();
            res.status(200).json(todos);
        } catch (error) {
            res.status(error.status).json({ error: error.externalMessage});
        }
    });

    /**
    GET by id /api/todos/:id
    */
    server.get('/api/todos/:id', async (req, res) => {
        const id = Number(req.params.id);

        try {
            const todo = await todoService.getTodoById(id);
            res.status(200).json(todo);
        } catch (error) {
            res.status(error.status).json({ error: error.externalMessage});
        }
    });


    /**
     POST create new /api/todos
     */
    server.post('/api/todos', async (req, res) => {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'title and description of todo items are required' });
        }

        try {
            const newTodo = await todoService.saveNewTodo(title, description);
            return res.status(201).json(newTodo);
        } catch (error) {
            res.status(error.status).json({ error: error.externalMessage});
        }
    });

    /**
     PATCH update status /api/todos/:id
     */
    server.patch('/api/todos/:id', async (req, res) => {
        const id = Number(req.params.id);
        const { isCompleted } = req.body;

        if (typeof isCompleted === 'undefined') {
            return res.status(400).json({ error: 'isCompleted is required to update a todo' });
        }

        try {
            const updatedStatusTodo = await todoService.updateStatus(id, isCompleted);
            return res.status(200).json(updatedStatusTodo);
        } catch (error) {
            res.status(error.status).json({ error: error.externalMessage});
        }
    });

    /**
     DELETE /api/todos
     */
    server.delete('/api/todos/:id', async (req, res) => {
        const id = Number(req.params.id);

        try {
            const deleteTodo = await todoService.deleteTodoById(id);
            return res.status(200).json(deleteTodo);
        } catch (error) {
            res.status(error.status).json({ error: error.externalMessage});
        }
    });

  return server;
};
module.exports = server;