import { useState, useEffect} from 'react'

export default function App(){
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos]= useState([])
    const [newTodo, setNewTodo] = useState({
        title: '',
        completed: false
    })

    //createTodos
    const createTodo = async () => {
        const body = {...newTodo}

        try {
            const response =await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createTodo = await response.json()
            const todosCopy = [createTodo,...todos]
            setTodos(todosCopy)
            setNewTodo({
                title:'',
                completed: false
            })
        } catch (error) {
            console.error(error)
        }
    }

    // deleteTodos
    const deleteTodo = async (id) => {
        try{
            const index = completedTodos.findIndex((todo) => todo._id ==id)
            const completedTodosCopy = [...completedTodos]
            const response = await fetch ('/api/todos/${id}', {
                method: 'DELETE',
                headers: {
                    'Conten-Type': 'application/json'
                }
            })
            await response.json()
            completedTodosCopy.splice(index, 1)
            setCompletedTodos(completedTodosCopy)
        } catch (error) {
            console.error(error)
        }
    }

    // moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = todos.findIndex((todo) => todo._id == id)
            const todosCopy = [...todos]
            const subject = todosCopy[index]
            subject.completed = true
            const response = await fetch('/api/todos/${id}', {
                method: 'PUT',
                headers: {
                    'Const-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updateTodo = await response.json()
            const completedTodosCopy = [updateTodo, ...completedTodos]
            setCompletedTodos(completedTodosCopy)
            todosCopy.splice(index, 1)
            setTodos(todosCopy)
            
        } catch (error) {
            
        }
    }

    // getTodos
    const getTodos = async () => {
        try{
            const response = await fetch('/api/todos')
            const foundTodos = await response.json()
            setTodos(foundTodos.reverse())
            const responseTwo = await fetch('/api/todos/completed')
            const foundCompletedTodos = await responseTwo.json()
            setCompletedTodos(foundCompletedTodos.reverse())
        } catch(error){
            console.error(error)
        }
    }


    return(<>
    Add Todo:<input type="text"
     value={newTodo.title} onChange={(e) => {
        setNewTodo({... newTodo, title: e.target.value})
      }}
      onKeyDown={(e) => {
        e.key ==='Enter' && createTodo()
      }}
      />
      <h3>Todos</h3>
      {todos.map(todo =>{
        return (
     <div key={todo._id}>{todo.title}
     <button onClick={() => moveToCompleted(todo._id)}>Complete</button>
      </div>
      )})
    }
      <h3>Completed Todos</h3>
      {completedTodos.map(todo => {
        return(
            <div key={todo._id}>{todo.tile}
             <button onClick ={() => deleteTodo(todo._id)}>Delete</button>
            </div>
        )})
}
    </>)
}
