const express = require('express')
const router = express.Router()
const todoCtrl = require('../../controllers/api/todos')

// Index /api/todos
router.get('/', todoCtrl.indexNotComplete, todoCtrl.jsonTodos)

// Index /api/todos/completed
router.get('/completed', todoCtrl.destroy, todoCtrl.jsonTodos)

//Delete /api/todos/:id
router.delete('/:id', todoCtrl.destroy, todoCtrl.jsonTodo)

// update /api/todos/:id
router.put('/:id', todoCtrl.update, todoCtrl.jsonTodo)

// Create /api/todos
router.post('/:id', todoCtrl.create, todoCtrl.jsonTodo)


//Show /api/todos/:id
router.get('/:id', todoCtrl.show, todoCtrl.jsonTodo)

module.exports = router


