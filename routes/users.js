const express = require('express')
const router = express.Router()
const authenticateToken  = require('../services/auth')


router.get('/', authenticateToken, (req, res) => {
    res.end(`${req.user} auth \n`)
})


module.exports = router