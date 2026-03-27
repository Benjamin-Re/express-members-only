const db = require('../db/queries')

async function getAllMessages(req, res) {
    const messages = await db.getAllMessages()
    res.render('index', { messages, user: req.user })
}

async function showCreateMessageForm(req, res) {
    res.render('create-message')
}

module.exports = {
    getAllMessages,
    showCreateMessageForm
}