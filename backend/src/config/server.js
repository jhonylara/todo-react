const port = 5000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.listen(port, function() {
    console.log(`Rodando na prota ${port}.`)
})

module.exports = server