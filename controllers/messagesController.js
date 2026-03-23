const db = require('../db/queries')

async function getAllMessages(req, res) {
    const messages = await db.getAllMessages()
    res.send(messages)
}

module.exports = {
    getAllMessages
}