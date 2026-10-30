require("dotenv").config()
const cookieParser = require("cookie-parser")
const socketIO = require("socket.io")
const config = require("./config")
const express = require("express")
const tarkine = require("tarkine")
const http = require('http')
const { connect, updateTarget } = require("./storage")

const app = express()
const server = http.createServer(app)
const io = new socketIO.Server(server)
const PORT = process.env.PORT || config.port

global.IO = io

app.set("view engine", "html")
app.engine("html", tarkine.renderFile)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))
app.use(express.json())

async function start() {
    const targets = await connect()
    app.use("/", require("./router")(targets, updateTarget))

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start().catch(error => {
    console.error("Unable to start application:", error)
    process.exitCode = 1
})