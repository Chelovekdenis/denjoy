
// Парсет токен

function parseToken(token) {
    let data = Buffer.from(token, 'base64').toString('ascii')
    return {
        username: data.split('.')[0],
        password: data.split('.')[1]
    }
}

module.exports = parseToken
