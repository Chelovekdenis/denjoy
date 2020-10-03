const client = require('./rediser')
const parseToken = require('./parser')


// Парсет токен с которым пришел Юзер и сверяет его с базой даных,
// если все хорошо пускает на следующий Роут

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)  return res.end("Unauthorized\n")

    let user = parseToken(token)

    client.get(user.username, (err, replay) => {

        if(err) console.log(err)

        if (replay === token) {
            req.user = user.username
            next()
        } else
            res.json({ msg: "invalid token" })

    })
}

module.exports = authenticateToken
