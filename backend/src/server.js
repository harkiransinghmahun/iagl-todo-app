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
            res.json(await todoService.getAllTodos());
        } catch (error) {
            console.error("Error fetching all todos from repository: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    /**
    GET by id /api/todos/:id
    */
    server.get('/api/todos/:id', async (req, res) => {
        const id = Number(req.params.id);

        try {
            const todo = await todoService.getTodoById(id);
            if (todo) {
                res.json(todo);
            } else {
                res.status(404).json({error: `Requested todo with id [${id}] not found`})
            }
        } catch (error) {
            console.error("Error fetching todo from repository: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
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
            const newTodo = todoService.createNewTodo(title, description);

            if (newTodo) {
                return res.status(201).json(newTodo);
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.error("Error creating a new todo: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

  return server;
};
module.exports = server;