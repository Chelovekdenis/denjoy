const express = require('express')
const router = express.Router()
const client = require('../services/rediser')
const { parseToken } = require('../services/parser')


router.post('/', (req, res) => {

    // TODO validation

    const username = req.body.username
    const password = req.body.password

    if (!username || !password)
        res.end("try again\n")

    client.get(username, (err, replay) => {

        if(err) console.log(err)

        let user = parseToken(replay)
        console.log(user)
        if (user.password === password) {
            console.log("password success")
            res.json({ accessToken: replay })
        } else
            res.end("try again\n")
    })
})

module.exports = router