require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const users = [
    {
        username: 'Kyle'
    },
    {
        username: 'Jim'
    }
]


app.get('/users', authenticateToken, (req, res) => {
    // res.json(users.filter(post => post.username === req.user.name))
    // res.json({name: res.user.name, Auth: true})
    // res.json({msg: req.user})
    res.end(`username: `)
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // const user = { name: username }

    console.log(req.body)

    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    let accessToken = username + "." + password + "." + process.env.ACCESS_TOKEN_SECRET
    accessToken = Buffer.from(accessToken).toString('base64')

    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log("AH -> " + authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    console.log(token)

    let user = Buffer.from(token, 'base64').toString('ascii')


    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(user)
    // if (err) return res.sendStatus(403)
    req.user = user
    next()
    // })
}

app.listen(3001, () => {
    console.log("Server started...")
})

// curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTYwMTY0MDc3M30._OjSaGRd8DkLvA3HYyoI_OA4cu4MIfiXx3Kb5-NbraE" http://localhost:3000/users
// curl -d "username=Kyle" http://localhost:3000/login
// curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"chelovek\", \"password\":\"123\"}" http://localhost:3001/login
// curl -X POST -H "Content-Type: application/json" -d '{"username":"chelovek","password":"123"}' http://localhost:3001/login
// curl -H "Authorization: Bearer Y2hlbG92ZWsxMjNiYWI=" http://localhost:3001/users