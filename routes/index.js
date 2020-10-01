const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.end("<h1>Privet</h1>")
  // res.render('index', { title: 'Express' })
})

module.exports = router


//telnet 127.0 0.1 3000
//GET / HTTP/1.1
//Host: 127.0 0.1