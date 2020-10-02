require('dotenv').config()

const express = require('express')
const app = express()
const redis = require("redis")
const client = redis.createClient()

client.on("error", function(error) {
    console.error(error)
})

client.set("user1",
    Buffer.from("user1.123." + process.env.ACCESS_TOKEN_SECRET).toString('base64'),
    redis.print)

client.set("user2",
    Buffer.from("user2.1234." + process.env.ACCESS_TOKEN_SECRET).toString('base64'),
    redis.print)

client.set("user3",
    Buffer.from("user3.12345." + process.env.ACCESS_TOKEN_SECRET).toString('base64'),
    redis.print)


app.use(express.json())

app.get('/users', authenticateToken, (req, res) => {
    // res.json(users.filter(post => post.username === req.user.name))
    // res.json({name: res.user.name, Auth: true})
    // res.json({msg: req.user})
    res.end(`${req.user} auth \n`)
})



app.post('/login', (req, res) => {

    // TODO validation

    const username = req.body.username
    const password = req.body.password
    // const user = { name: username }

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


    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)


    // let accessToken = username + "." + password + "." + process.env.ACCESS_TOKEN_SECRET
    // accessToken = Buffer.from(accessToken).toString('base64')

    // client.set(req.body.username, accessToken, redis.print)

    // res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log("AH -> " + authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    console.log("token -> " + token)

    let user = parseToken(token)

    console.log("user -> " + user)

    client.get(user.username, (err, replay) => {
        if (replay === token) {
            req.user = user.username
            next()
        } else
            res.json({ msg: "invalid token" })

    })

    // let user = Buffer.from(token, 'base64').toString('ascii')


    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(user)
    // if (err) return res.sendStatus(403)
    // req.user = user

    // })
}

function parseToken(token) {
    let data = Buffer.from(token, 'base64').toString('ascii')
    return {
        username: data.split('.')[0],
        password: data.split('.')[1]
    }
}

app.listen(3001, () => {
    console.log("Server started...")
})

// curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTYwMTY0MDc3M30._OjSaGRd8DkLvA3HYyoI_OA4cu4MIfiXx3Kb5-NbraE" http://localhost:3000/users
// curl -d "username=Kyle" http://localhost:3000/login
// curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"chelovek\", \"password\":\"123\"}" http://localhost:3001/login
// curl -X POST -H "Content-Type: application/json" -d '{"username":"chelovek","password":"123"}' http://localhost:3001/login
// curl -H "Authorization: Bearer Y2hlbG92ZWsxMjNiYWI=" http://localhost:3001/users
// curl -X POST http://localhost:3001/users
// user1 --token-- curl -H "Authorization: Bearer dXNlcjEuMTIzLmJhYg==" http://localhost:3001/users