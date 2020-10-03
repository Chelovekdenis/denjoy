const express = require('express')
const path = require('path')
const logger = require('morgan')
const createError = require('http-errors')
require('dotenv').config()


const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')
const downloadRouter = require('./routes/download')
const uploadRouter = require('./routes/upload')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/login', loginRouter)
app.use('/users', usersRouter)
app.use('/download', downloadRouter)
app.use('/upload', uploadRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

