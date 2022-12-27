// controllers/api/todos

const Todo = require('../../models/todo')

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show,
    update,
    destroy,
    jsonTodos,
    jsonTodo
}

// jsonTodos, jsonTodo
function jsonTodo (req, res){
    res.json(res.locals.data.todo)
}

function jsonTodos (req, res){
    res.json(res.locals.data.todos)
}


// create
async function create(req, rest, next){
    try {
        const todo = await Todo.create(req.body)
        console.log(todo)
        rest.locals.data.todo = todo
    } catch (error) {
        rest.status(400).json({ msg:error.message })
    }
}

// read - ndex - show
async function indexComplete(req, res, next){
    try{
        const todos = await Todo.find({completed: true})
        res.locals.data.todos = todos
        next()
    } catch (error){
        res.status(400).json({ msg: error.message })

    }
}

async function indexNotComplete(req, res, next){
    try{
        const todos = await Todo.find({completed: false})
        res.locals.data.todos = todos
        next()
    } catch (error){
        res.status(400).json({ msg: error.message })

    }
}

// show

async function show(req, res, next){
    try{
        const todo = await Todo.findById(req.params.id)
        res.locals.data.todo = todo
        next()
    } catch (error){
        res.status(400).json({ msg: error.message })

    }
}

// update

async function update(req, res, next){
    try{
        const todo = await Todo.findByIdAnUpdate(req.params.id, req.body, { new: true})
        res.locals.data.todo = todo
        next()
    } catch (error){
        res.status(400).json({ msg: error.message })

    }
}

//destroy
async function destroy(req, res, next){
    try{
        const todo = await Todo.findByIdAnDelete(req.params.id)
        res.locals.data.todo = todo
        next()
    } catch (error){
        res.status(400).json({ msg: error.message })

    }
}

