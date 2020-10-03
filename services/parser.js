function parseToken(token) {
    let data = Buffer.from(token, 'base64').toString('ascii')
    return {
        username: data.split('.')[0],
        password: data.split('.')[1]
    }
}

module.exports = parseToken


// curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTYwMTY0MDc3M30._OjSaGRd8DkLvA3HYyoI_OA4cu4MIfiXx3Kb5-NbraE" http://localhost:3000/users
// curl -d "username=Kyle" http://localhost:3000/login
// curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"chelovek\", \"password\":\"123\"}" http://localhost:3000/login
// curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"123"}' http://localhost:3000/login
// curl -H "Authorization: Bearer Y2hlbG92ZWsxMjNiYWI=" http://localhost:3000/users
// curl -X POST http://localhost:3000/users
// user1 --token-- curl -H "Authorization: Bearer dXNlcjEuMTIzLmJhYg==" http://localhost:3000/users