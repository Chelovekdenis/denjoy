const express = require('express')
const router = express.Router()

const users = [{username: 'test', password: 'test'}, {username: 'user', password: '12345'}]
let auth = false

// router.use((req, res, next) => {
//     console.log("Middle")
//     req.body.count = 113
//     next()
// })

router.get('/', (req, res) => {
    console.log(req.body.count)

    if (auth) {
        res.end("GET !!!!!!!")
    } else {
        res.end("GET")
    }
})


router.post('/', (req, res) => {
    console.log(req.body.username, req.body.password)


    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)

    console.log(user)

    if (req.body.username === "user" && req.body.password === "12345") {
        auth = true
        console.log("Log in")
        res.send('true')
    } else {
        console.log("Nooooo")
        res.send('false')
    }


})

module.exports = router

// curl -d "username=user&password=12345" http://localhost:3000/login
