require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const basicAuth = require('C:\\Users\\Chelovek\\WebstormProjects\\denjoy\\test\\_helpers\\basic-auth')
const errorHandler = require('C:\\Users\\Chelovek\\WebstormProjects\\denjoy\\test\\_helpers\\error-handler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// use basic HTTP auth to secure the api
app.use(basicAuth)

// curl -d "username=user&password=12345" http://localhost:3000/users/authenticate
// curl -X GET http://localhost:3000/users


// api routes
app.use('/users', require('./users/users.controller'))

// global error handler
app.use(errorHandler)

// start server
const port = 3000
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port)
})