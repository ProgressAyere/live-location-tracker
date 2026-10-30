const fs = require("fs")
const path = require("path")

const filePath = process.env.DATA_FILE || path.join(__dirname, "data", "targets.json")
const directory = path.dirname(filePath)

function ensureStorage() {
    fs.mkdirSync(directory, { recursive: true })

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "{}\n", "utf8")
    }
}

function loadTargets() {
    ensureStorage()

    const contents = fs.readFileSync(filePath, "utf8")
    const targets = JSON.parse(contents)

    if (targets == null || typeof targets !== "object" || Array.isArray(targets)) {
        throw new Error(`Target storage must contain an object: ${filePath}`)
    }

    return targets
}

function saveTargets(targets) {
    ensureStorage()

    const temporaryPath = `${filePath}.tmp`
    fs.writeFileSync(temporaryPath, `${JSON.stringify(targets, null, 2)}\n`, "utf8")
    fs.renameSync(temporaryPath, filePath)
}

module.exports = {
    loadTargets,
    saveTargets,
}
