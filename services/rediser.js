require('dotenv').config()

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

module.exports = client