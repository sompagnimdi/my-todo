// server.js
require('dotenv').config()
require('./config/database')
/* running this will connect our database to our MERN app */
const express = require('express')
const app = express()
/* create an app object that we can use to build our API that will connect our react app*/
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3001

// middleware
app.use(express.json()) //req.body
app.use((req, rest, next) => {
    rest.locals.data ={}
    next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico' )))
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/todos', require('./routes/api/todos'))

app.get('*', (req, rest) => {
    rest.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log('I am listening on ${PORT}. We the builder.')
})
