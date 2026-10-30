const { MongoClient } = require("mongodb")

let client
let targetsCollection

async function connect() {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error("MONGODB_URI environment variable is required")
    }

    client = new MongoClient(uri)
    await client.connect()

    const database = client.db(process.env.MONGODB_DB || "live-location-tracker")
    targetsCollection = database.collection("targets")
    await targetsCollection.createIndex({ id: 1 }, { unique: true })

    return loadTargets()
}

async function loadTargets() {
    if (!targetsCollection) {
        throw new Error("MongoDB storage is not connected")
    }

    const targets = {}
    const records = await targetsCollection.find({}).toArray()

    for (const target of records) {
        targets[target.id] = {
            location: target.location,
            firstSeen: target.firstSeen,
            lastSeen: target.lastSeen,
        }
    }

    return targets
}

async function updateTarget(id, location, now) {
    const target = await targetsCollection.findOneAndUpdate(
        { id },
        {
            $set: {
                location,
                lastSeen: now,
            },
            $setOnInsert: {
                id,
                firstSeen: now,
            },
        },
        {
            upsert: true,
            returnDocument: "after",
        }
    )

    return {
        location: target.location,
        firstSeen: target.firstSeen,
        lastSeen: target.lastSeen,
    }
}

module.exports = {
    connect,
    updateTarget,
}
