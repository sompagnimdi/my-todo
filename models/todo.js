const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
    title: {require: true, type: String},
    completed: {require: true, type: String}
}, {
    timestamps: true
})

const Todo = model('Todo', todoSchema)

module.exports = Todo;

