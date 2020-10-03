const express = require('express')
const router = express.Router()
const parseToken = require('../services/parser')
const client = require('../services/rediser')


// Получает токен из Редис по имени, парсет его и
// сверяет пароли, если все хорошо дальше отправляет
// пользователя с токеном

router.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password)
        res.end("try again\n")

    client.get(username, (err, replay) => {
        if(err) console.log(err)

        let user = parseToken(replay)

        if (user.password === password)
            res.json({ accessToken: replay })
        else
            res.end("try again\n")
    })
})

module.exports = router